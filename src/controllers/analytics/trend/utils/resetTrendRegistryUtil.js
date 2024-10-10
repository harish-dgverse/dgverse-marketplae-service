/*
  This module handles the updation of TrendRegistry table based on records in trend_history
  @author: Mohammed Jassim
*/
const generateUniqueId = require('generate-unique-id');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resetRegistryWithTokenAndNftAnalytics = async (batch_number) => {
  try {
    const calculatedCount = await prisma.TrendRecordHistory.groupBy({
      where: {
        trendType: {
          not: 'user'
        }, 
      },
      by: ['trendType', 'identifier'],
      _sum: {
        weight: true
      },
    });
    for (const elements of calculatedCount) {
      // TODO with single update
      await prisma.TrendRegistry.upsert({
        where: { type_identifier: { type: elements.trendType, identifier: elements.identifier } },
        update: { cumulative_weight: elements._sum.weight, batch_number },
        create: { type: elements.trendType, identifier: elements.identifier, cumulative_weight: elements._sum.weight, batch_number },
      });
    }
  } catch (e) {
    return null;
  }
}

const resetRegistryWithUserAnalytics = async (batch_number) => {
  try {
    const calculatedCount = await prisma.TrendRecordHistory.groupBy({
      by: ['userId'],
      _sum: {
        weight: true
      },
    });
    for (const elements of calculatedCount) {
      // TODO with single update
      await prisma.TrendRegistry.upsert({
        where: { type_identifier: { type: 'user', identifier: `${elements.userId}` } },
        update: { cumulative_weight: elements._sum.weight, batch_number },
        create: { type: 'user', identifier: `${elements.userId}`, cumulative_weight: elements._sum.weight, batch_number },
      });
    }
  } catch(e) {
    return null;
  }
}

async function resetTrendRegistryByTime(batch_number, batch_number_latest_from_db) {
  try {
    await resetRegistryWithTokenAndNftAnalytics(batch_number, batch_number_latest_from_db);
    await resetRegistryWithUserAnalytics(batch_number, batch_number_latest_from_db);
  } catch (e) {
    return null;
  }
};

module.exports = {
  resetTrendRegistryByTime
};
