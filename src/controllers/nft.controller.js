const httpStatus = require('http-status');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const catchAsync = require('../utils/catchAsync');
const { getNFTById } = require('../utils/nftUtil');
const { addTrendHistory, deleteTokenHistory, addToNotifications } = require('../utils/trendUtil');
const { processTags } = require('./utils/processInput');
const { getSaleDetailsUsingSaleId, getSocialTokenEntry } = require('./utils/saleUtils');
const { getUserDetailsById, getUserByWalletId } = require('../utils/userUtil');
const { searchTokenById } = require('../utils/tokenUtil');

const getNftDetailsById = catchAsync(async (req, res) => {
  const { nftId } = req.params;
  const { loggedUserId: currentUserId } = req.query;
  const result = await getNFTById(nftId, { includeTags: true, includeAddtlDetails: true, includeHistory: true, currentUserId });
  if (!result) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: 'No results' });
  }
  res.status(httpStatus.OK).send(result);
});

const getNftNamesByNftIds = catchAsync(async (req, res) => {
  const { nftNameIds } = req.params;
  const nftIdArray = nftNameIds.split(',');
  const result = await prisma.nFT.findMany({
    where: {
      nft_id: {
        in: nftIdArray,
      },
    },
    select: {
      nft_name: true,
      nft_id: true
    }
  });
  if (!result) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: 'No results' });
  }
  const nftNameMap = {};
  result.forEach((nft) => {
    nftNameMap[nft.nft_id] = nft.nft_name;
  });

  res.status(httpStatus.OK).send(nftNameMap);
});

const transferNFT = catchAsync(async (req, res) => {
  const { identifier, buyerWalletId, sellerId, saleId, buyerId, quotedPrice, tokenType, volume } = req.body;
  let buyerIdInDB = buyerId;
  if (!buyerIdInDB) {
    const result = await prisma.wallet.findUnique({
      where: {
        wallet_address: buyerWalletId,
      },
      select: {
        user_id: true
      }
    });
    buyerIdInDB = result.user_id;
  }
  if (!buyerIdInDB) {
    res.status(httpStatus.BAD_REQUEST).end();
  }
  const saleMode = quotedPrice ? 'DIRECT_SALE' : 'FREE_TRANSFER';
  if (tokenType === 'nft' || tokenType === 'sbt') {
    const response = await prisma.NFT.update({
      where: {
        nft_id: identifier,
      },
      data: {
        wallet_address: buyerWalletId,
        user_id: buyerIdInDB,
        Sale: {
          upsert: {
            where: { saleId: saleId ? saleId : 0 },
            update: {
              buyerId: buyerIdInDB,
              status: "COMPLETED",
              updatedAt: new Date(),
            },
            create: {
              status: "COMPLETED",
              saleMode,
              buyerId: buyerIdInDB,
              sellerId,
              tokenType,
              updatedAt: new Date(),
            },
          },
        },
      },
    })
    if (!response) return res.status(httpStatus.BAD_REQUEST).end();
    // Giving trend weight for seller and buyer
    if (tokenType === 'nft') {
      await addTrendHistory('nft', 'transfer', identifier, sellerId, sellerId, { quotedPrice });
      if (saleMode === 'DIRECT_SALE') {
        addTrendHistory('nft', 'transfer', identifier, buyerIdInDB, buyerIdInDB, { quotedPrice });
      }
    } else if (tokenType === 'sbt') {
      addTrendHistory('nft', 'transfer', identifier, sellerId, sellerId);
    }
    addToNotifications('nft', 'transfer', '', identifier, buyerIdInDB, { tokenType, saleMode });
    res.status(httpStatus.OK).end();
  }
  else if (tokenType === 'ft') {
    const { StId } = await getSocialTokenEntry({ token_id: identifier, ownedBy: sellerId });
    const buyerCount = await getSocialTokenEntry({ token_id: identifier, ownedBy: buyerIdInDB });
    const saleDetails = await getSaleDetailsUsingSaleId({ saleId });

    // add entry in ft table
    const addEntryinSt = {
      where: { StId: buyerCount?.StId ? buyerCount?.StId : 0 },
      update: { volume: { increment: volume } },
      create: {
        token_id: identifier,
        ownedByWalletId: buyerWalletId,
        ownedBy: buyerIdInDB,
        volume
      },
    }

    // update count in ft table
    const updateStTable = {
      where: { StId },
      data: {
        volume: { decrement: volume }
      }
    };
    // update count in sale table if whole buy
    let updateSaleEntry, addSaleEntry = {};
    if (saleDetails && saleDetails.volume === volume) {
      updateSaleEntry = {
        where: { saleId },
        data: {
          status: "COMPLETED",
          buyerId: buyerIdInDB,
          updatedAt: new Date(),
        }
      }
    } else {
      if (saleMode === 'DIRECT_SALE') {
        updateSaleEntry = {
          where: { saleId },
          data: {
            volume: { decrement: volume }
          }
        }
      }
      // add entry in sale
      addSaleEntry = {
        data: {
          sellerId,
          buyerId: buyerIdInDB,
          volume,
          status: "COMPLETED",
          saleMode,
          tokenType: 'ft',
          tokenId: identifier,
          quotedPrice: quotedPrice ? saleDetails.quotedPrice : null,
          updatedAt: new Date(),
        },
      }
    }
    // add entry in st sale
    const addEntryinStSales = {
      data: {
        saleId,
        sellerId,
        buyerId: buyerIdInDB,
        volume
      },
    }
    const queries = [
      prisma.socialToken.update(updateStTable),
      prisma.socialToken.upsert(addEntryinSt),
    ];
    if (saleMode === 'DIRECT_SALE') {
      queries.push(prisma.socialTokenSales.createMany(addEntryinStSales));
      queries.push(prisma.Sale.update(updateSaleEntry));
    }
    if (!saleDetails || saleDetails.volume !== volume) {
      queries.push(prisma.Sale.createMany(addSaleEntry))
    }
    const [userUpdateRx, socialMediaRx, walletRx, a, b] = await prisma.$transaction(queries);
    await addTrendHistory('token', 'transfer', identifier, sellerId, sellerId, { volume, quotedPrice: saleDetails ? saleDetails.quotedPrice : 1 });
    addTrendHistory('token', 'transfer', identifier, buyerIdInDB, buyerIdInDB, { volume, quotedPrice: saleDetails ? saleDetails.quotedPrice : 1 });
    addToNotifications('token', 'transfer', '', identifier, buyerIdInDB, { tokenType, volume, saleMode });
    res.status(httpStatus.OK).end();
  }
});

const mintToken = catchAsync(async (req, res) => {
  const { tokenId, description, name, images, socialMedia, additionalDetails, userId, nftId, serialNumber, tags, metadata, totalSupply, volume: volumeToMint, tokenType } = req.body;
  if (tokenType === 'nft' || tokenType === 'sbt') {
    // Images key refactoring
    const { coverPic: cover_pic, displayPic: display_pic, icon, thumbnail } = images;
    const nftTags = processTags(tags);
    // Add all fields
    await prisma.NFT.create({
      data: {
        user_id: userId,
        mintedBy: userId,
        token_id: tokenId,
        nft_id: nftId,
        nft_name: name,
        description,
        serial_number: serialNumber,
        metadata,
        social_media: {
          create: socialMedia,
        },
        additional_info: {
          create: additionalDetails,
        },
        image: {
          create: { cover_pic, display_pic, icon, thumbnail },
        },
        tags: {
          create: nftTags
        }
      },
    });
    addTrendHistory('nft', 'mint', nftId, null, userId);
    await prisma.Token.update({
      where: { token_id: tokenId },
      data: { total_supply: totalSupply },
    });
    res.status(httpStatus.CREATED).end();
  } else {
    // Update count in token table and add ebtry in social token table
    const stEntry = await getSocialTokenEntry({ token_id: tokenId, ownedBy: userId });
    const tokenDetails = await searchTokenById(tokenId);
    const userDetails = await getUserDetailsById(userId);
    const atomic_unit = 1 / Math.pow(10, tokenDetails.decimal);
    await prisma.socialToken.upsert({
      where: { StId: stEntry?.StId ? stEntry?.StId : 0 },
      update: { volume: { increment: volumeToMint } },
      create: {
        token_id: tokenId,
        ownedByWalletId: userDetails.Wallet[0].wallet_address,
        ownedBy: userId,
        volume: volumeToMint,
      },
    }),
      addTrendHistory('token', 'mint', tokenId, null, userId, { volumeToMint, tokenType });
    await prisma.Token.update({
      where: { token_id: tokenId },
      data: { total_supply: tokenDetails.decimal !== 0 ? totalSupply * atomic_unit : totalSupply },
    });
    res.status(httpStatus.CREATED).end();
  }
});

const burnToken = catchAsync(async (req, res) => {
  const { tokenId, nftIds, userId, totalSupply, volume, tokenType } = req.body;
  const tokenDetails = await searchTokenById(tokenId);
  const atomic_unit = 1 / Math.pow(10, tokenDetails.decimal);
  if (tokenType === 'nft' || tokenType === 'sbt') {
    await prisma.NFT.updateMany({
      where: {
        nft_id: {
          in: nftIds,
        },
      },
      data: { status: 'Burned' },
    });
    await prisma.Token.update({
      where: { token_id: tokenId },
      data: { total_supply: totalSupply },
    });
    deleteTokenHistory('nft', nftIds, { totalSupply, userId });
    res.status(httpStatus.OK).end();
  } else {
    const { StId } = await getSocialTokenEntry({ token_id: tokenId, ownedBy: userId });
    const updateStTable = {
      where: { StId },
      data: {
        volume: { decrement: volume }
      }
    };
    await prisma.socialToken.update(updateStTable),
      await prisma.Token.update({
        where: { token_id: tokenId },
        data: { total_supply: tokenDetails.decimal !== 0 ? totalSupply * atomic_unit : totalSupply },
      });
    deleteTokenHistory('token', tokenId, { totalSupply, userId });
    res.status(httpStatus.OK).end();
  }
});

const wipeToken = catchAsync(async (req, res) => {
  const { tokenId, nftIds, userId, totalSupply, volume, tokenType, wipeAccountId } = req.body;
  const tokenDetails = await searchTokenById(tokenId);
  const atomic_unit = 1 / Math.pow(10, tokenDetails.decimal);
  if (tokenType === 'nft' || tokenType === 'sbt') {
    await prisma.NFT.updateMany({
      where: {
        nft_id: {
          in: nftIds,
        },
      },
      data: { status: 'Wiped' },
    });
    await prisma.Token.update({
      where: { token_id: tokenId },
      data: { total_supply: totalSupply },
    });
    res.status(httpStatus.OK).end();
  } else {
    const wipedUserId = await getUserByWalletId(wipeAccountId);
    if (wipedUserId) {
      const { StId } = await getSocialTokenEntry({ token_id: tokenId, ownedBy: wipedUserId.user.user_id });
      const updateStTable = {
        where: { StId },
        data: {
          volume: { decrement: volume }
        }
      };
      await prisma.socialToken.update(updateStTable);
    }
    await prisma.Token.update({
      where: { token_id: tokenId },
      data: { total_supply: tokenDetails.decimal !== 0 ? totalSupply * atomic_unit : totalSupply },
    });
    res.status(httpStatus.OK).end();
  }
});

module.exports = {
  mintToken,
  getNftDetailsById,
  getNftNamesByNftIds,
  transferNFT,
  burnToken,
  wipeToken,
};
