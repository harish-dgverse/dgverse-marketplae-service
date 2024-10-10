/*
Trend Handling module
1. getTrend
    Get Trending records
2. resetTrend
    Reset all trending values based on time stamp

Trending logic
1. Add entry to history table
2. resetTrend: updates registry, trend and leadership tables

Authors: Mohammed Jassim, Harish Haridas
*/
const httpStatus = require('http-status');
const cron = require('node-cron');
const generateUniqueId = require('generate-unique-id');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const catchAsync = require('../../../utils/catchAsync');
const { resetTrendTableWithTrendRegistry, resetLeaderboardWithRegistry } = require('./utils/resetTrendUtil')
const { resetTrendRegistryByTime } = require('./utils/resetTrendRegistryUtil');
const { getTrendingList } = require('./utils/getTrendUtil');


const getTrend = catchAsync(async (req, res) => {
  const response = await getTrendingList({ filterToken: true, filterNFT: true });
  const spicedResult = {
    token: response.token.slice(0, 10),
    nft: response.nft.slice(0, 10),
    nftc: response.nftc.slice(0, 10),
    ft: response.ft.slice(0, 10),
    nftOnSale: response.nftOnSale.slice(0, 10),
    ftOnSale: response.ftOnSale.slice(0, 10),
  };
  res.status(200).send(spicedResult);
});

const resetTrend = catchAsync(async (req, res) => {
  const batch_number = generateUniqueId();
  // restting trend registry
  await resetTrendRegistryByTime(batch_number);
  // Reseting trend table
  await resetTrendTableWithTrendRegistry(batch_number);
  // Reseting leader table
  await resetLeaderboardWithRegistry(batch_number);

  await prisma.TrendRegistry.deleteMany({
    where: {
      batch_number: {
        not: batch_number
      }
    },
  });

  await prisma.Trend.deleteMany({
    where: {
      batch_number: {
        not: batch_number
      }
    },
  });

  await prisma.leaderBoard.deleteMany({
    where: {
      batch_number: {
        not: batch_number
      }
    },
  });
  res.status(httpStatus.OK).end();
});

// cron.schedule('* * * * * *', () => {
//   (async () => {
//     const batch_number = generateUniqueId();
//     // restting trend registry
//     await resetTrendRegistryByTime(batch_number);
//     // Reseting trend table
//     await resetTrendTableWithTrendRegistry(batch_number);
//     // Reseting leader table
//     await resetLeaderboardWithRegistry(batch_number);

//     await prisma.TrendRegistry.deleteMany({
//       where: {
//         batch_number: {
//           not: batch_number
//         }
//       },
//     });

//     await prisma.Trend.deleteMany({
//       where: {
//         batch_number: {
//           not: batch_number
//         }
//       },
//     });

//     await prisma.leaderBoard.deleteMany({
//       where: {
//         batch_number: {
//           not: batch_number
//         }
//       },
//     });
//   })();
// });

module.exports = {
  getTrend,
  resetTrend,
};