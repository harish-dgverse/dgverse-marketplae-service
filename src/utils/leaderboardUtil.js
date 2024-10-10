const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const logger = require('../config/logger');

function processLeaderboardInput(userId, operation) {
    let data = {};
    // Array is not needed??
    // let whereCondition = [{
    //   user_id: userId
    // }];
    let whereCondition = {
        user_id: userId
    };
    const createRecord = { ...whereCondition };
    if (operation !== undefined) {
        switch (operation.type) {
            case "buy": data.total_asset_transaction = { increment: operation.value };
                data.current_asset_value = { increment: 1 };
                createRecord.total_asset_transaction = operation.value;
                createRecord.current_asset_value = 1;
                break;
            case "sell": data.total_sell_transaction = { increment: operation.value };
                data.current_asset_value = { decrement: 1 };
                // whereCondition.push({current_asset_value: {gt: operation.value-1}});
                break;
            case "follow":
                data.current_followers = { increment: operation.value };
                createRecord.current_followers = 1;
                break;
            case "unfollow":
                data.current_followers = { decrement: operation.value };
                // Commented, suppose multiple operation coming then such filtering will omit the record
                // whereCondition.push({current_followers: {gt: operation.value-1}});
                break;
            case "mint":
                data.current_asset_value = { increment: 1 };
                createRecord.current_asset_value = 1;
                break;

            case "burn":
            case "wipe": data.current_asset_value = { increment: operation.value }; break;
            case "free-transfer": break;
        }
    };
    if (Object.keys(data).length !== 0) {
        const update = {
            where: whereCondition,
            update: data,
            create: createRecord
        }
        return update;
    }
}

/**
 * Function for parsing API request and formatting the input for prisma module.
 * Step 1: Parse input parameter
 * Step 2: Check for buy and follower options in input parameter
 * Step 3: For buy
 * Step 4: Total asset and current asset will be incremented
 * Step 5: For sell
 * Step 6: Total sell operation will be incremented
 * Step 7: Current asset value will be decremented, provided value should not be negative
 * Step 8: For follower options
 * Step 9: If follow option set to true means follower count will be increased
 * Step 10: If follower option set to false means unfollow action, provided it should not be negative
 * @param {*} req 
 * @returns object
 */

const updateLeaderboard = async (userId, operation) => {
    const user = processLeaderboardInput(userId, operation);
    if (user !== undefined) {
        try {
            const result = await prisma.LeaderBoard.upsert(user);
            if (result.count == 0) {
                logger.info(`updateLeaderboard: userId: ${userId}, operation: ${JSON.stringify(operation)}, Error: Cannot perform the updation, check the data`);
            }
        } catch (error) {
            if (error.code == "P2025") {
                res.status(httpStatus.NOT_FOUND).send({ "message": "User ID not found" });
                logger.info(`updateLeaderboard: userId: ${userId}, operation: ${JSON.stringify(operation)}, Error: User not found`);
            } else {
                logger.info(`updateLeaderboard: userId: ${userId}, operation: ${JSON.stringify(operation)}, Error: ${error}`);
            }
        }
    } else {
        logger.info(`updateLeaderboard: userId: ${userId}, operation: ${JSON.stringify(operation)}, Error: Missing operation`);
    }
}

const trendingStatus = async (type, identifier) => {
    const result =  await prisma.trend.findFirst({
        where: {
            unique_id: identifier, type
        },
        select: {
            rank: true,
        }
    });
    return result;
}

module.exports = {
    updateLeaderboard,
    trendingStatus,
}