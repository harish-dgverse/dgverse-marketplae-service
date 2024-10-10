const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const catchAsync = require('../../utils/catchAsync');
const {getUserDetailsById} = require('../../utils/userUtil');

const pagination = 10;

const getLeaderboardData = catchAsync(async (req, res) => {
  const assetHolding = await prisma.LeaderBoard.findMany({
    take: pagination,
    orderBy: {
      rank: "asc"
    },
    select: {
        user_id: true,
        rank: true,
    }
  });
  const response = [];
  for (item of assetHolding) {
    const userDetails = await getUserDetailsById(parseInt(item.user_id));
    if (userDetails) {
      response.push({
        ...userDetails,
        rank: item.rank,
        followerCount: userDetails._count.userFollowers,
        assets: userDetails._count.Token + userDetails._count.nft,
      })
    }
  }
  res.send(response.slice(0, 10));
});

module.exports = {
    getLeaderboardData
};
