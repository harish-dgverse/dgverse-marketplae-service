/*
  This module handles the updation of Trend main table based on records in trend_registry
  @author: Mohammed Jassim
*/
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getRecordsFromTrendRegistry(typeList, batch_number) {
    try {
        const records = await prisma.TrendRegistry.findMany({
            select: { identifier: true, type: true },
            where: {
                type: { in: typeList },
                batch_number,
            },
            orderBy: [
                {
                    cumulative_weight: "desc"
                },
            ]
        });
        return records;
    } catch (e) {
        return null;
    }
}

/**
 * 1. Get record from table trend_registry
 * 2. Insert records with new batch number to trend table
 * 3. Clears records with old batch number
 */

async function resetTrendTableWithTrendRegistry(batch_number) {
    try {
        const registry_records = await getRecordsFromTrendRegistry(['token', 'nft'], batch_number);
        // Seperate rank for token and nft
        const rankIndex = {
            token: 1,
            nft: 1,
        }
        for (const [index, element] of registry_records.entries()) {
            const rank = rankIndex[element.type]++;
            await prisma.Trend.upsert({
                where: { type_unique_id: { type: element.type, unique_id: element.identifier } },
                update: { rank, batch_number },
                create: {
                    rank,
                    unique_id: element.identifier,
                    batch_number,
                    type: element.type
                },
            });
        }
    } catch (e) {
        return null;
    }
}

/**
 * 1. Get record from table trend_registry
 * 2. Insert records with new batch number to leaderboard
 * 3. Clears records with old batch number
 */
async function resetLeaderboardWithRegistry(batch_number) {
    try {
        const registry_records = await getRecordsFromTrendRegistry(['user'], batch_number);
        let rankState = 1;
        for (const [index, element] of registry_records.entries()) {
            let rank = rankState++;
            await prisma.leaderBoard.upsert({
                where: { user_id: element.identifier },
                update: { rank, batch_number },
                create: {
                    rank,
                    user_id: element.identifier,
                    batch_number,
                },
            });
        }
    } catch (e) {
        return null;
    }
}

module.exports = {
    resetTrendTableWithTrendRegistry,
    resetLeaderboardWithRegistry,
};