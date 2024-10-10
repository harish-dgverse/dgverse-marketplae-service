/*
  @author: Mohammed Jassim
*/
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { searchTokenById } = require('./tokenUtil');
const { searchNFTById } = require('./nftUtil');
const { getUserById } = require('./userUtil');
const { resetTrendTableWithTrendRegistry, resetLeaderboardWithRegistry } = require('../controllers/analytics/trend/utils/resetTrendUtil')
const { resetTrendRegistryByTime } = require('../controllers/analytics/trend/utils/resetTrendRegistryUtil');

/**
 * get last price function is for calculating price change (current price - last price)
 * if there is no buy record history default last price will be zero.
 * Last price is collected from history
 * @param {*} uniqueId 
 * @returns price change
 */
async function getLastPrice(uniqueId) {
    const record = await prisma.TrendRegistry.findUnique({  // get from trend history
        where: {
            unique_id: uniqueId

        }
    });

    if (record !== null) {
        return record.last_price;

    } else {
        return 0;
    }
};

async function getPriceChange(uniqueId, newPrice) {
    const lastPrice = await getLastPrice(uniqueId);

    let priceChange = 0;

    if (lastPrice != 0) {
        priceChange = newPrice - lastPrice;

    }

    return priceChange;
}

const commonWeightIndex = {
    like: 3,
    views: 1,
    share: 4,
    follow: 20,
    create: 10,
    wishlist: 5,
    salecancel: 0,
    saleexpire: 0,
}
const weightIndex = {
    'nft': { ...commonWeightIndex, transfer: 5, mint: 2 },
    'token': { ...commonWeightIndex, mint: 10 },
    'user': { ...commonWeightIndex },
}

const getWeight = (type, mode, options = {}) => {
    const { volumeToMint, tokenType, quotedPrice, volume } = options;
    if (tokenType === 'ft' && volumeToMint && (mode === 'mint' || mode === 'create')) {
        return volumeToMint < 50 ? 10 : Math.floor(volumeToMint/5);
    }
    if (type === 'nft' && quotedPrice && mode === 'transfer') {
        return quotedPrice < 20 ? 5 : Math.floor(quotedPrice/4);
    }
    if (type === 'token' && quotedPrice && volume && mode === 'transfer') {
        const weightValue = quotedPrice*volume;
        return weightValue < 100 ? 5 : Math.floor(quotedPrice/20);
    }
    return weightIndex[type][mode] !== undefined ? weightIndex[type][mode] : 1;
};

/**
 * Creating trend history with (like, follow, buy price)
 * Create entry for two tables (trend_record_history and trend_registry)
 * 1.   Intialize parameter (prisma object) for create/update table records
 * 2.   Create new entry for tables  (trend_record_history and trend_registry) if unique_id doesn't exist 
 * 3.   Update record in trend_registry if unique_id exist
 * 3,a. Create new entry for table trend_record_history corresponding to unique_id
 * @param {*} uniqueId 
 * @param {*} params 
 * @returns 
 */

const getOwnerOfAsset = async (trendType, identifier) => {
    let userId;
    if (trendType === 'token')
        userId = await searchTokenById(identifier);
    else userId = await searchNFTById(identifier);
    return userId.user_id;
};

const getIdentiferName = async (type, identifier) => {
    if (!identifier) return null;
    let name = null;
    switch (type) {
        case 'token':
            {
                const result = await searchTokenById(identifier);
                name = result.name;
            }
            break;
        case 'nft':
            {
                const result = await searchNFTById(identifier);
                name = result.nft_name;
            }
            break;
        case 'user':
            {
                const result = await getUserById(identifier);
                name = result.user_name;
            }
            break;
        default:
            break;
    }
    return name;
};

async function addTrendHistory(trendType, trendMode, identifier, userId, actionerId, options = {}) {
    // if (uniqueId)
    // uniqueId = uniqueId.toString();
    let assetOwner = userId;
    if (trendType !== 'user' && trendMode !== 'transfer')
        assetOwner = await getOwnerOfAsset(trendType, identifier)
    let createTrendRecordHistory = {
        trendMode, // like(3), views(1), share(4), follow(20), mint(2), create(10), create user(10), wishlist(5)
        trendType, // token, user, nft
        identifier, // token id, user
        userId: assetOwner,
        weight: getWeight(trendType, trendMode, options),
        actionerId,
    }   // Prisma create object for table TrendRecordHistory

    await prisma.trendRecordHistory.create({
        data: createTrendRecordHistory
    });


    // // restting trend registry
    // await resetTrendRegistryByTime();
    // // Reseting trend table
    // await resetTrendTableWithTrendRegistry();
    // // Reseting leader table
    // await resetLeaderboardWithRegistry();
}

async function addToNotifications(type, mode, userId, identifier, actionerId, options = {}) {
    const {tokenType, saleMode, volume} = options;
    let assetOwner = userId;
    const identifierName = await getIdentiferName(type, identifier);
    const actionerName = await getIdentiferName('user', actionerId);
    if (userId === '')
        assetOwner = await getOwnerOfAsset(type, identifier)
    else assetOwner = userId;
    let message;
    switch (mode) {
        case 'wishlist':
            message = `${actionerName} have wishlisted ${identifierName}`;
            break;
        case 'follow':
            message = `${actionerName} have started following you`;
            break;
        case 'like':
            message = `${actionerName} have liked ${identifierName}`;
            break;
        case 'transfer':
            if (saleMode === 'FREE_TRANSFER') {
                message = `${identifierName} has been transferred to you by ${assetOwner}`;
                assetOwner = actionerId;
            } else if (saleMode === 'DIRECT_SALE') {
                if (tokenType === 'ft') {
                    message = `${volume} units of ${identifierName} has been bought by ${actionerName}`;
                } else message = `${identifierName} has been bought by ${actionerName}`;
            }
            break;
        default:
            break;
    }
    let createRecord = {
        type,
        message, // token, user, nft
        identifier, // token id, user
        user_id: assetOwner,
    }

    await prisma.notifications.create({
        data: createRecord
    });
}

const deleteTrendHistory = async (trendType, trendMode, identifier, userId) => {
    await prisma.trendRecordHistory.deleteMany({
        where: { identifier, trendType, trendMode },
    })
}

const deleteTokenHistory = async (trendType, identifier, options = {}) => {
    const { tokenDeleted, totalSupply, userId } = options;
    if (tokenDeleted) {
        return await prisma.trendRecordHistory.deleteMany({
            where: {
                identifier: {
                    startsWith: tokenId
                }
            },
        });
    }
    if (trendType === 'ft') {
        await prisma.trendRecordHistory.deleteMany({
            where: {
                identifier,
                trendType: 'ft',
                trendMode: 'mint'
            },
        });
        await addTrendHistory(trendType, 'mint', identifier, userId, userId, { volumeToMint: totalSupply })
    } else {
        return await prisma.trendRecordHistory.deleteMany({
            where: {
                identifier: {
                    in: identifier,
                }, trendType: 'nft'
            },
        });
    }
}

module.exports = {
    addTrendHistory,
    deleteTrendHistory,
    deleteTokenHistory,
    addToNotifications,
    getIdentiferName,
};