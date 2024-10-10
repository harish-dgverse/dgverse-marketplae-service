const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { nftOnSaleFields, completedSaleFields, nftMintedFields } = require('../dbUtils/user.db');

const getSocialTokenEntry = async ({ token_id, ownedBy }) => {
    return await prisma.socialToken.findFirst({
        where: {
            token_id,
            ownedBy,
        },
        select: {
            StId: true,
            volume: true,
        },
    });
}

const getSaleDetailsUsingSaleId = async ({ saleId, nftId, tokenId, sellerId }) => {
    let whereCondition;
    if (nftId) {
        whereCondition = {
            nftId,
            status: "ON_GOING"
        }
    } else if (saleId) {
        whereCondition = {
            saleId
        }
    } else if (tokenId && sellerId) {
        whereCondition = {
            tokenId,
            sellerId,
            status: "ON_GOING"
        }
    }
    if (!whereCondition) return null;
    return await prisma.sale.findFirst({
        where: whereCondition,
        select: {
            saleId: true,
            saleMode: true,
            quotedPrice: true,
            expiresAt: true,
            timestamp: true,
            saleId: true,
            sellerId: true,
            volume: true,
            tokenType: true,
            NFT: {
                select: {
                    nft_id: true,
                }
            },
            token: {
                select: {
                    token_id: true,
                }
            },
        },
    });
}

const getSaleActivityHistory = async (identifier, tokenType) => {
    let history = [];
    let saleQueryWhereCondtn, recentActivityWhereCondtn;
    if (tokenType === 'nft') {
        saleQueryWhereCondtn = {
            nftId: identifier,
            status: "COMPLETED",
        };
        recentActivityWhereCondtn = {
            trendType: 'nft',
            identifier: identifier,
            trendMode: {
                in: [
                    'onsale',
                    'salecancel',
                    'saleexpire']
            }
        }
    } else if (tokenType === 'ft') {
        saleQueryWhereCondtn = {
            tokenId: identifier,
            status: "COMPLETED",
        }
        recentActivityWhereCondtn = {
            trendType: 'ft',
            identifier: identifier,
            trendMode: {
                in: [
                    'onsale',
                    'salecancel',
                    'saleexpire']
            }
        }
    } else return history;
    const completedSales = await prisma.sale.findMany({
        where: saleQueryWhereCondtn,
        select: completedSaleFields,
    });
    const saleActivites = completedSales.map(item => {
        const saleMode = item.saleMode;
        if (saleMode === 'FREE_TRANSFER') {
            const artifiactName = item.NFT ? item.NFT.nft_name : item.token.name;
            return {
                message: `${artifiactName} was transferred to ${item.userBuyer.user_name}`,
                timestamp: item.timestamp,
            }
        } else {
            if (tokenType === 'nft') {
                return {
                    message: `${item.NFT.nft_name} was bought by ${item.userBuyer.user_name} for ${item.quotedPrice} Hbar`,
                    timestamp: item.timestamp,
                };
            } else if (tokenType === 'ft') {
                return {
                    message: `${item.volume} ${item.token.symbol}(s) was bought by ${item.userBuyer.user_name} for ${item.quotedPrice} Hbar`,
                    timestamp: item.timestamp,
                }
            }
        }
    });
    const recentActivity = await prisma.trendRecordHistory.findMany({
        where: recentActivityWhereCondtn,
        select: {
            identifier: true,
            trendMode: true,
            trendType: true,
            timestamp: true,
            actionerId: true,
            tsh_id: true,
        },
    });
    console.log(recentActivity);
    for (activity of recentActivity) {
        switch (activity.trendMode) {
            case 'onsale':
                message = tokenType === 'nft' ? `NFT was put on sale` : `FT was put on sale`;
                break;
            case 'salecancel':
                message = `Sale was cancelled`;
                break;
            case 'saleexpire':
                message = `Sale has expired`;
                break;
            default:
                break;
        }
        saleActivites.push({
            message,
            timestamp: activity.timestamp,
        });
    }
    return saleActivites;
}

const transferNFTUtil = async (nft_id, saleId, quotedPrice, buyerId) => {
    try {
        const update = await prisma.NFT.update({
            where: {
                nft_id,
            },
            data: {
                user_id: buyerId,
                Sale: {
                    updateMany: {
                        where: {
                            nftId: nft_id,
                            status: "ON_GOING",
                        },
                        data: {
                            status: "COMPLETED",
                            quotedPrice,
                            buyerId,
                            updatedAt: new Date()
                        },
                    },
                },
            },
        })
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

const freeTransferNFT = async (nft_id, buyer_wallet_address, sellerId) => {
    try {
        const { user_id: buyerId } = await prisma.wallet.findUnique({
            where: {
                wallet_address: buyer_wallet_address,
            },
            select: {
                user_id: true
            }
        });
        if (!buyerId) {
            return false;
        }

        const update = await prisma.NFT.update({
            where: {
                nft_id,
            },
            data: {
                wallet_address: buyer_wallet_address,
                user_id: buyerId,
                Sale: {
                    create: {
                        status: "COMPLETED",
                        saleMode: 'FREE_TRANSFER',
                        buyerId,
                        updatedAt: new Date(),
                        sellerId,
                    },
                },
            },
        })
        return true;
    } catch (e) {
        return false;
    }
}

const getCurrentSaleActivity = ({ nftId, result, currentUserId }) => {
    return { nftId, currentUserId }
}

module.exports = {
    getSaleDetailsUsingSaleId,
    getSaleActivityHistory,
    transferNFTUtil,
    freeTransferNFT,
    getCurrentSaleActivity,
    getSocialTokenEntry,
}