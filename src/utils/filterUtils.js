const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { getTokenById } = require('./tokenUtil');
const { getNFTById } = require('./nftUtil');

const getNewestNftFirst = async ({ filterByToken, filterByUser }) => {
    let whereCondition = { status: null };
    if (filterByToken) whereCondition = { ...whereCondition, token_id: filterByToken };
    if (filterByUser) whereCondition = { ...whereCondition, user_id: filterByUser };
    const dataSet = await prisma.NFT.findMany({
        where: whereCondition,
        select: {
            nft_id: true
        },
        orderBy: [
            {
                timestamp: 'desc',
            }
        ],
    });
    const response = {
        nft: []
    };
    for (item of dataSet) {
        const details = await getNFTById(item.nft_id);
        if (details && details.nft_type === 'nft') response.nft.push(details)
    }
    return response;
}

const getExpiringList = async ({ filterByToken, filterByUser }) => {
    let whereCondition = {
        status: "ON_GOING",
        tokenType: "nft"
    };
    if (filterByToken) {
        whereCondition = {
            ...whereCondition, nftId: {
                startsWith: filterByToken
            }
        }
    }
    if (filterByUser) {
        whereCondition = { ...whereCondition, sellerId: filterByUser }
    }
    const dataSet = await prisma.sale.findMany({
        where: whereCondition,
        select: {
            nftId: true,
        },
        orderBy: [
            {
                expiresAt: 'asc',
            }
        ],
    });
    const response = {
        token: [],
        nft: []
    };
    for (item of dataSet) {
        const details = await getNFTById(item.nftId);
        if (details) response.nft.push(details)
    }
    return response;
}

const getBasedOnPrice = async ({ lth, filterByToken, filterByUser }) => {
    let whereCondition = {
        status: "ON_GOING",
        tokenType: "nft"
    };
    if (filterByToken) {
        whereCondition = {
            ...whereCondition, nftId: {
                startsWith: filterByToken
            }
        }
    }
    if (filterByUser) {
        whereCondition = { ...whereCondition, sellerId: filterByUser }
    }
    const dataSet = await prisma.sale.findMany({
        where: whereCondition,
        select: {
            nftId: true,
            saleMode: true,
            quotedPrice: true,
        }
    });
    if (lth) {
        dataSet.sort((a, b) => a.quotedPrice - b.quotedPrice);
    } else {
        dataSet.sort((a, b) => b.quotedPrice - a.quotedPrice);
    }
    const response = {
        token: [],
        nft: []
    };
    for (item of dataSet) {
        const details = await getNFTById(item.nftId);
        if (details) response.nft.push(details)
    }
    return response;
}

/* Collection specific */

const getNewestTokenFirst = async ({ filterByUser }) => {
    let whereCondition = {
        OR: [
            {
                status: null,
            },
            { status: { in: ['Paused'] } },
        ],
        AND: {
            token_type: { in: ['nft', 'ft'] }
        }
    };
    // if (filterByUser) whereCondition = { ...whereCondition, user_id: filterByUser };
    const dataSet = await prisma.token.findMany({
        where: whereCondition,
        select: {
            token_id: true
        },
        orderBy: [
            {
                timestamp: 'desc',
            }
        ],
    });
    const response = {
        token: [],
        nft: []
    };
    for (item of dataSet) {
        const details = await getTokenById(item.token_id);
        if (details) {
            const socialTokenDetails = details.SocialToken;
            const userFound = socialTokenDetails.some(item => item.ownedBy === filterByUser);
            if (!userFound && filterByUser) continue;
            response.token.push(details)
        }
    }
    return response;
}

const getBasedOnTotalSupply = async ({ lth, filterByUser }) => {
    const sortOrder = lth ? 'asc' : 'desc';
    let whereCondition = {
        OR: [
            {
                status: null,
            },
            { status: { in: ['Paused'] } },
        ],
        AND: {
            token_type: { in: ['nft', 'ft'] }
        }
    };
    // if (filterByUser) whereCondition = { ...whereCondition, user_id: filterByUser };
    const dataSet = await prisma.token.findMany({
        where: whereCondition,
        select: {
            token_id: true
        },
        orderBy: [
            {
                total_supply: sortOrder,
            }
        ],
    });
    const response = {
        token: [],
    };
    for (item of dataSet) {
        const details = await getTokenById(item.token_id);
        if (details) {
            const socialTokenDetails = details.SocialToken;
            const userFound = socialTokenDetails.some(item => item.ownedBy === filterByUser);
            if (!userFound && filterByUser) continue;
            response.token.push(details)
        }
    }
    return response;
}

const getBasedOnTotalSupplyOnMarket = async ({ lth, filterByUser }) => {
    const sortOrder = lth ? 'asc' : 'desc';
    let whereCondition = {
        OR: [
            {
                status: null,
            },
            { status: { in: ['Paused'] } },
        ],
        AND: {
            token_type: { in: ['nft', 'ft'] }
        }
    };
    if (filterByUser) whereCondition = { ...whereCondition, user_id: filterByUser };
    const dataSet = await prisma.token.findMany({
        where: whereCondition,
        select: {
            token_id: true
        },
        orderBy: [
            {
                total_supply: sortOrder,
            }
        ],
    });
    const response = {
        token: [],
    };
    for (item of dataSet) {
        const details = await getTokenById(item.token_id);
        if (details) {
            const socialTokenDetails = details.SocialToken;
            const userFound = socialTokenDetails.some(item => item.ownedBy === filterByUser);
            if (!userFound && filterByUser) continue;
            response.token.push(details)
        }
    }
    if (lth) response.token.sort((a, b) => a.inMarketCount - b.inMarketCount);
    else response.token.sort((a, b) => b.inMarketCount - a.inMarketCount);
    return response;
}

const getBasedOnTotalVolume = async ({ filterByUser }) => {
    let whereCondition = {};
    if (filterByUser) whereCondition = { user_id: filterByUser };
    const dataSet = await prisma.token.findMany({
        where: whereCondition,
        select: {
            token_id: true,
            nft: {
                select: {
                    nft_id: true,
                    Sale: {
                        select: {
                            saleMode: true,
                            quotedPrice: true,
                            timestamp: true,
                        },
                        orderBy: [
                            {
                                timestamp: 'desc',
                            }
                        ],
                    }
                }
            }
        },
    });
    const response = [];
    for (const token of dataSet) {
        const details = await getTokenById(token.token_id);
        if (!details) continue;
        const childNFTs = token.nft;
        details.volume = 0;
        for (nft of childNFTs) {
            const saleDetails = nft.Sale;
            let saleWithPriceFound = false;
            for (sale of saleDetails) {
                if (sale.quotedPrice) {
                    saleWithPriceFound = true;
                    details.volume += sale.quotedPrice;
                }
                if (saleWithPriceFound) break;
            }
        }
        response.push(details)
    }
    response.sort((a, b) => b.volume - a.volume);
    return { token: response };
}

const getFavoriteItems = async ({ type, user_id }) => {
    let queryInput = '';
    if (type === 'token') {
        queryInput = {
            where: {
                token_id: {
                    not: null
                },
                user_id,
            },
            select: {
                token_id: true
            },
        }
    } else {
        queryInput = {
            where: {
                nft_id: {
                    not: null
                }
            },
            select: {
                nft_id: true
            },
        }
    }
    let dataSet = await prisma.favorites.findMany(queryInput);
    if (type === 'token') {
        dataSet = dataSet.map(x => x.token_id)
    } else {
        dataSet = dataSet.map(x => x.nft_id)
    }
    console.log(dataSet);
    return dataSet;
}
module.exports = {
    getNewestNftFirst,
    getNewestTokenFirst,
    getBasedOnTotalSupply,
    getFavoriteItems,
    getExpiringList,
    getBasedOnPrice,
    getBasedOnTotalVolume,
    getBasedOnTotalSupplyOnMarket,
};