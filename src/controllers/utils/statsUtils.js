const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllCollectionsCreated = async (nftCount) => {
  const collectionsCreated = await prisma.Token.groupBy({
    by: [nftCount.groupByColumn],
    where: nftCount.whereClause,
    _count: {
      _all: true
    },
  })
  if (collectionsCreated.length > 0) {
    return {
      type: 'collectionsCreated',
      label: 'Collections Created',
      value: collectionsCreated?.[0]._count._all,
    }
  } else return false
}

const getNftOwned = async (nftCount) => {
  const nftOwned = await prisma.NFT.groupBy({
    by: [nftCount.groupByColumn],
    where: nftCount.whereClause,
    _count: {
      _all: true
    },
  })
  if (nftOwned.length > 0) {
    return {
      type: 'nftOwned',
      label: 'NFT Owned',
      value: nftOwned?.[0]._count._all,
    }
  } else false
}

const getNftCreated = async (nftCount) => {
  const nftCreated = await prisma.Token.findMany({
    where: nftCount.whereClause,
    select: {
      user_id: true,
      nft: {
        where: nftCount.whereClause,
      },
    },
  })
  if (nftCreated.length > 0) {
    const initialCount = 0;
    const nftSum = nftCreated.reduce(
      (accumulator, { nft }) => accumulator + nft?.length,
      initialCount
    );
    return {
      type: 'nftCreated',
      label: 'NFT Minted',
      value: nftSum,
    }
  } else return false;
}

const getAllHbrCreated = async (saleAmount) => {
  const hbrCreated = await prisma.sale.groupBy({
    by: [saleAmount.groupByColumn],
    where: saleAmount.whereClause,
    _sum: {
      quotedPrice: true,
    },
  });
  if (hbrCreated.length > 0) {
    const volumeGenerated = hbrCreated.reduce((item, nftTotal) => item + nftTotal._sum.quotedPrice, 0);
    return {
      type: 'hbrCreated',
      label: 'Volume generated',
      value: volumeGenerated,
    }
  } else return false;

}

module.exports = {
  getAllCollectionsCreated,
  getNftOwned,
  getNftCreated,
  getAllHbrCreated,
}
