const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { getSaleActivityHistory, getSaleDetailsUsingSaleId } = require('../controllers/utils/saleUtils');
const { getUserAttachments } = require('./userUtil');
const { trendingStatus } = require('./leaderboardUtil');

const getNFTById = async (nftId, { includeTags, includeAddtlDetails, includeHistory, currentUserId } = { includeTags: false, includeAddtlDetails: false, includeHistory: false, currentUserId: 0 }) => {
    const result = await prisma.NFT.findUnique({
        where: {
            nft_id: nftId
        },
        select: {
            nft_name: true,
            nft_id: true,
            timestamp: true,
            description: true,
            status: true,
            image: {
                select: {
                    cover_pic: true,
                    display_pic: true,
                    icon: true,
                }
            },
            token: {
                select: {
                    token_id: true,
                    name: true,
                    symbol: true,
                    timestamp: true,
                    token_type: true,
                    token_category: true,
                    image: {
                        select: {
                            cover_pic: true,
                            display_pic: true,
                            icon: true,
                        }
                    }
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
                            wallet_id: true,
                            wallet_address: true,
                        }
                    },
                    image: {
                        select: {
                            image_id: true,
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
            mintedByUser: {
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
                    },
                    SocialMedia: {
                        select: {
                            media: true,
                            url: true
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
            additional_info: includeAddtlDetails,
            tags: includeTags,
            _count: {
                select: { UserShare: true, UserView: true, UserLike: true },
            },
        }
    });
    if (result) {
        result.nft_type = result.token.token_type;
        result.nft_category = result.token.token_category;
        const saleDetails = await getSaleDetailsUsingSaleId({ nftId });
        if (saleDetails) {
            result.saleDetails = saleDetails;
            result.salePrice = saleDetails.quotedPrice;
        }
        if (includeHistory) {
            result.history = [{
                message: `NFT was minted`,
                timestamp: result.timestamp,
            }];
            const history = await getSaleActivityHistory(nftId, 'nft');
            if (history.length > 0) {
                result.history.push(...history);
                result.history.sort((a, b) => b.timestamp - a.timestamp);
            }
        }
        if (currentUserId && currentUserId !== 'undefined' && currentUserId !== '') {
            result.userActions = await getUserAttachments('nft', nftId, currentUserId, result.user.user_id);
            const followMinter = await getUserAttachments('user', null, currentUserId, result.mintedByUser.user_id);
            if (followMinter.follow)
                result.userActions.followMinter = true;
            else result.userActions.followMinter = false;
        }
        result.ranking = await trendingStatus('nft', nftId);
        result.count = result._count;
    }
    return result;
}

const searchNFTById = async (nftId) => {
    const result = await prisma.NFT.findUnique({
        where: {
            nft_id: nftId
        },
        select: {
            nft_name: true,
            nft_id: true,
            timestamp: true,
            user_id: true,
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
    if (result) {
        result.type = 'NFT';
    }
    return result;
}

const searchNFTMatch = async (searchText) => {
    const result = await prisma.NFT.findMany({
        where: {
            OR: [
                {
                    nft_id: {
                        contains: searchText,
                    }
                },
                {
                    nft_name: {
                        contains: searchText,
                    }
                },
            ],
        },
        select: {
            nft_name: true,
            nft_id: true,
            timestamp: true,
            user_id: true,
        }
    });
    console.log('result nft');
    console.log(result);
    if (result.length > 0) return result.map(x => { return { ...x, type: 'NFT' } });
    return result;
}

const getTags = async (nftId) => {
    const result = await prisma.NFT.findUnique({
        where: {
            nft_id: nftId
        },
        select: {
            nft_name: true,
            user_id: true,
            tags: true,
        }
    });
    return result;
};

const getNftWithRelatedTags = async (tags, nftId) => {
    const tagsList = tags.map(item => item.tag);
    const resultTags = await prisma.tags.groupBy({
        by: ['nft_id'],
        where: {
            tag: {
                in: tagsList,
            },
            token_id: null,
        },
        _count: {
            tag: true,
        },
        orderBy: {
            _count: {
                tag: 'desc',
            },
        },
    });
    const response = [];
    for (item of resultTags) {
        if (item.nft_id !== nftId) {
            console.log(item.nft_id, nftId);
            const nftDetails = await getNFTById(item.nft_id);
            if (nftDetails) response.push(nftDetails);
        }
    }
    return response;
};

const splitNftId = (nftId) => {
    const index = nftId.lastIndexOf('.');
    const tokenId = nftId.slice(0, index);
    const serialNumber = nftId.slice(index + 1);
    return { tokenId, serialNumber: parseInt(serialNumber, 10) };
}

module.exports = {
    getNFTById,
    searchNFTById,
    searchNFTMatch,
    getTags,
    getNftWithRelatedTags,
    splitNftId,
}