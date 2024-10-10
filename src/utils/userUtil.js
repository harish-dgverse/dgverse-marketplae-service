const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { userFields } = require('../controllers/dbUtils/user.db');

const getUserAttachments = async (type, identifier, currentuser, userTo) => {
    // Check follwing
    const user_id = parseInt(currentuser);
    const userToCheck = parseInt(userTo);
    const follow = await prisma.followings.findMany({
        where: {
            user_id,
            following_user_id: userToCheck,
        },
        select: {
            followings_id: true,
        }
    });
    if (type === 'user') return {
        follow: follow.length > 0 ? true : false,
    }
    // Check like
    let whereCondition;
    if (type === 'nft') {
        whereCondition = {
            nft_id: identifier
        };
    } else if (type === 'token') {
        whereCondition = {
            token_id: identifier, user_id
        };
    }
    const like = await prisma.userLike.findMany({
        where: whereCondition,
        select: {
            like_id: true,
        }
    });
    // Check favorite
    const favorite = await prisma.favorites.findMany({
        where: whereCondition,
        select: {
            favorites_id: true,
        }
    });
    return {
        like: like.length > 0 ? true : false,
        favorite: favorite.length > 0 ? true : false,
        follow: follow.length > 0 ? true : false,
    }
}

const getUserByWalletId = async (walletId) => {
    const result = await prisma.wallet.findUnique({
        where: {
            wallet_address: walletId,
        },
        select: {
            wallet_address: true,
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
        },
    });
    if (result) {
        result.type = 'Account';
        result.user_id = result?.user?.user_id;
    }
    return result;
}

const getUserDetailsById = async (userId, currentUserId) => {
    const result = await prisma.User.findUnique({
        where: {
            user_id: userId,
        },
        select: userFields
    });
    if (result) {
        if (currentUserId && currentUserId !== 'undefined' && currentUserId !== '') {
            result.userActions = await getUserAttachments('user', null, currentUserId, userId);
        }
        result.count = result?._count;
    }
    return result;
}

const getUserById = async (user_id) => {
    const result = await prisma.user.findUnique({
        where: {
            user_id: parseInt(user_id),
        },
        select: {
            user_name: true,
            subscriptionType: true,
            verified: true,
        },
    });
    if (result) {
        result.type = 'Account';
    }
    return result;
}

const searchUserMatch = async (searchText) => {
    const result = await prisma.user.findMany({
        where: {
            OR: [
                {
                    user_name: {
                        contains: searchText,
                    }
                },
                {
                    Wallet: {
                        some: {
                            wallet_address: {
                                contains: searchText,
                            }
                        }
                    }
                },
            ],
        },
        select: {
            user_name: true,
            subscriptionType: true,
            verified: true,
            timestamp: true,
            user_id: true,
            Wallet: {
                select: {
                    wallet_address: true
                }
            }
        },
    });
    console.log('result user');
    console.log(result);
    if (result.length > 0) return result.map(x => { return { ...x, type: 'Account', wallet_address: x.Wallet[0].wallet_address } });
    return result;
}

module.exports = {
    getUserByWalletId,
    getUserDetailsById,
    getUserAttachments,
    getUserById,
    searchUserMatch,
}