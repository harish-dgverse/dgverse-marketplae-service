const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { getSaleDetailsUsingSaleId, getSaleActivityHistory } = require('../controllers/utils/saleUtils');
const { getUserAttachments } = require('./userUtil');
const { trendingStatus } = require('./leaderboardUtil');
const { fetchTokenInfo } = require('../controllers/mirrorNode.controller');

const getAvailableActions = async (tokenDetails) => {
    // const availableActions = ['Delete collection'];
    const availableActions = ['Delete collection'];

    const { nftDetails, user, status, SocialToken: socialTokenDetails } = tokenDetails;
    const tokenInfo = await fetchTokenInfo(tokenDetails.token_id);
    if (!tokenInfo) return availableActions;
    const { supply_key, freeze_key, kyc_key, pause_key, wipe_key } = tokenInfo;
    if (freeze_key) availableActions.push('Freeze an account', 'Unfreeze an account');
    if (kyc_key) availableActions.push('Enable KYC on account', 'Disable KYC on account');
    if (pause_key) {
        if (status === 'Paused') availableActions.push('Unpause Collection');
        else availableActions.push('Pause Collection');
    }
    if (supply_key && (nftDetails?.length > 0 && nftDetails.some(nft => nft.user.user_id === user.user_id) || socialTokenDetails?.[0]?.volume > 0)) availableActions.push('Burn tokens');
    if (wipe_key && (nftDetails?.length > 0 && nftDetails.some(nft => nft.user.user_id !== user.user_id) || socialTokenDetails?.length > 1)) availableActions.push('Wipe tokens');
    return availableActions;
};

const getTokenById = async (tokenId, currentUserId) => {
    const tokenDetails = await prisma.Token.findUnique({
        where: {
            token_id: tokenId,
        },
        select: {
            name: true,
            token_id: true,
            total_supply: true,
            symbol: true,
            timestamp: true,
            token_type: true,
            token_category: true,
            ft_sales_price: true,
            status: true,
            supply_key: true,
            freeze_key: true,
            pause_key: true,
            kyc_key: true,
            wipe_key: true,
            user: {
                select: {
                    user_name: true,
                    subscriptionType: true,
                    verified: true,
                    user_id: true,
                    timestamp: true,
                    Wallet: {
                        select: {
                            wallet_id: true,
                            wallet_address: true,
                        }
                    },
                    image: {
                        select: {
                            display_pic: true,
                            cover_pic: true,
                            icon: true,
                        }
                    },
                    SocialMedia: {
                        select: {
                            media: true,
                            url: true
                        }
                    }

                }
            },
            image: {
                select: {
                    cover_pic: true,
                    display_pic: true,
                    icon: true,
                }
            },
            nft: {
                select: {
                    nft_name: true,
                    nft_id: true,
                    timestamp: true,
                    status: true,
                    image: {
                        select: {
                            cover_pic: true,
                            display_pic: true,
                            icon: true,
                        }
                    },
                    image: {
                        select: {
                            cover_pic: true,
                            display_pic: true,
                            icon: true,
                        }
                    },
                    user: {
                        select: {
                            user_name: true,
                            subscriptionType: true,
                            verified: true,
                            user_id: true,
                            Wallet: {
                                select: {
                                    wallet_id: true
                                }
                            },
                            image: {
                                select: {
                                    image_id: true,
                                    display_pic: true,
                                    cover_pic: true,
                                    icon: true,
                                }
                            }

                        }
                    },
                    social_media: {
                        select: {
                            media: true,
                            url: true
                        }
                    },
                }
            },
            SocialToken: {
                select: {
                    ownedBy: true,
                    ownedByWalletId: true,
                    volume: true,
                    ownedByUser: {
                        select: {
                            user_name: true,
                            subscriptionType: true,
                            verified: true,
                            user_id: true,
                            Wallet: {
                                select: {
                                    wallet_id: true
                                }
                            },
                            image: {
                                select: {
                                    image_id: true,
                                    display_pic: true,
                                    cover_pic: true,
                                    icon: true,
                                }
                            }
                        }
                    },
                }
            },
            social_media: {
                select: {
                    media: true,
                    url: true
                }
            },
            additional_info: {
                select: {
                    attribute: true,
                    value: true
                }
            },
            _count: {
                select: { UserShare: true, UserView: true, UserLike: true },
            },
        }
    });
    if (!tokenDetails) return undefined;
    tokenDetails.inMarketCount = 0;
    if (tokenDetails.nft?.length > 0) {
        tokenDetails.nftDetails = await Promise.all(tokenDetails.nft.filter(item => item.status === null).map(async (nftDetails) => {
            const saleDetails = await getSaleDetailsUsingSaleId({ nftId: nftDetails.nft_id });
            if (saleDetails) {
                tokenDetails.inMarketCount++;
                nftDetails.salePrice = saleDetails.quotedPrice;
                nftDetails.saleDetails = saleDetails;
            }
            return nftDetails;
        }));
    }
    tokenDetails.nftDetails = tokenDetails?.nft;
    delete tokenDetails?.nft;
    if (tokenDetails.SocialToken?.length > 0) {
        tokenDetails.socialTokenDetails = await Promise.all(tokenDetails.SocialToken.map(async (stDetails) => {
            const saleDetails = await getSaleDetailsUsingSaleId({ tokenId, sellerId: stDetails.ownedBy });
            if (saleDetails) {
                stDetails.saleDetails = saleDetails;
                tokenDetails.inMarketCount = tokenDetails.inMarketCount + saleDetails.volume;
                tokenDetails.salePrice = saleDetails.quotedPrice;
            }
            return stDetails;
        }));

        tokenDetails.history = [{
            message: `FT Collection was created`,
            timestamp: tokenDetails.timestamp,
        }];
        const history = await getSaleActivityHistory(tokenId, 'ft');
        if (history.length > 0) {
            tokenDetails.history.push(...history);
            tokenDetails.history.sort((a, b) => b.timestamp - a.timestamp);
        }
    }

    tokenDetails.count = tokenDetails?._count;
    if (currentUserId && currentUserId !== 'undefined' && currentUserId !== '') {
        tokenDetails.userActions = await getUserAttachments('token', tokenId, currentUserId, tokenDetails.user.user_id);
    }
    tokenDetails.ranking = await trendingStatus('token', tokenId);
    tokenDetails.actionsAvailable = await getAvailableActions(tokenDetails);
    return tokenDetails;
}

const searchTokenById = async (tokenId) => {
    const tokenDetails = await prisma.Token.findUnique({
        where: {
            token_id: tokenId
        },
        select: {
            name: true,
            token_id: true,
            total_supply: true,
            symbol: true,
            timestamp: true,
            token_type: true,
            token_category: true,
            user_id: true,
            decimal: true,
            image: true,
            user: {
                select: {
                    user_id: true,
                    user_name: true,
                    subscriptionType: true,
                    verified: true,
                    image: {
                        select: {
                            icon: true,
                            cover_pic: true,
                            display_pic: true,
                            thumbnail: true,
                        },
                    },
                },
            },
        }
    });
    if (tokenDetails) tokenDetails.type = 'Collection';
    return tokenDetails;
}

const searchTokenMatch = async (searchText) => {
    const tokenDetails = await prisma.Token.findMany({
        where: {
            OR: [
                {
                    token_id: {
                        contains: searchText,
                    }
                },
                {
                    name: {
                        contains: searchText,
                    }
                },
            ],
        },
        select: {
            name: true,
            token_id: true,
            total_supply: true,
            symbol: true,
            timestamp: true,
            token_type: true,
            token_category: true,
            user_id: true,
        }
    });
    if (tokenDetails.length > 0) return tokenDetails.map(x => { return { ...x, type: 'Collection' } });
    return tokenDetails;
}

module.exports = {
    getTokenById,
    searchTokenById,
    searchTokenMatch,
}