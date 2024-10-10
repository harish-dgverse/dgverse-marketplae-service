const httpStatus = require('http-status');
const { PrismaClient } = require('@prisma/client');
const catchAsync = require('../../utils/catchAsync');
const prisma = new PrismaClient();
const { processTags } = require('../utils/processInput');
const { addTrendHistory } = require('../../utils/trendUtil');

const createToken = catchAsync(async (req, res) => {
  const { tokenId: token_id, name, symbol, treasuryAccount: treasury_account, autoRenewDate: auto_renew_time_period,
    defaultFreezeStatus: default_freeze_status, description,
    royaltyStatus,
    royaltyPercent,
    decimal, status, socialMedia, additionalDetails: additionalInfo, userId, images, tags,
    kycKey: kyc_key, freezeKey: freeze_key, wipeKey: wipe_key, customFeeKey: fee_schedule_key, pauseKey: pause_key, immutable,
    maxSupply: max_supply,
    initialSupply: initial_supply,
    tokenCategory,
    tokenType,
    audienceTarget,
    ftAudience,
    ftSpendMethod,
    contactName,
    contactEmail,
    useCaseDesc,
    ftEarnMethod,
    ftMarket,
    lineOfBusiness,
    saleVolume,
    salePrice,
    saleExpiresAt,
    totalSupply,
  } = req.body;
  // Images key refactoring
  const { coverPic: cover_pic, displayPic: display_pic, icon, thumbnail } = images;
  const atomic_unit = 1 / Math.pow(10, decimal);
  let token_type;
  let SocialToken;
  switch (tokenType) {
    case 'Non fungible token (NFT)':
      token_type = 'nft';
      break;
    case 'Fungible token (FT)':
      token_type = 'ft';
      SocialToken = {
        ownedByWalletId: treasury_account,
        ownedBy: userId,
        volume: initial_supply
      }
      break;
    case 'Soul bound token (SBT)':
      token_type = 'sbt';
      break;
    default:
      break;
  }
  const nftTags = processTags(tags);
  // Add all fields
  await prisma.Token.create({
    data: {
      token_id,
      name,
      symbol,
      token_type,
      description,
      treasury_account,
      default_freeze_status,
      decimal,
      ft_sales_price: salePrice,
      total_supply: token_type === 'ft' && decimal !== 0 ? initial_supply * atomic_unit : initial_supply,
      initial_supply: token_type === 'ft' && decimal !== 0 ? initial_supply * atomic_unit : initial_supply,
      token_category: tokenCategory,
      status,
      auto_renew_time_period,
      supply_key: true,
      private_key: true,
      kyc_key,
      freeze_key,
      max_supply,
      wipe_key,
      pause_key,
      fee_schedule_key,
      admin_key: !immutable,
      royalty_percent: royaltyStatus ? royaltyPercent : null,
      social_media: {
        create: socialMedia,
      },
      additional_info: {
        create: additionalInfo,
      },
      image: {
        create: { cover_pic, display_pic, icon, thumbnail },
      },
      tags: {
        create: nftTags
      },
      SocialToken: {
        create: SocialToken
      },
      wallet_id: treasury_account,
      user_id: userId,
    },
  });
  if (saleVolume) {
    await prisma.Sale.create({
      data: {
        tokenId: token_id,
        tokenType: 'ft',
        saleMode: 'DIRECT_SALE',
        quotedPrice: salePrice,
        volume: saleVolume,
        orginalVolume: saleVolume,
        sellerId: userId,
        expiresAt: saleExpiresAt,
        status: 'ON_GOING',
      },
    });
  }
  addTrendHistory('token', 'create', token_id, null, userId, { volumeToMint: initial_supply, tokenType: 'ft' });
  res.status(httpStatus.CREATED).end();
});

module.exports = {
  createToken,
};
