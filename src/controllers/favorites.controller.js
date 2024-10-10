const httpStatus = require('http-status');
const { PrismaClient } = require('@prisma/client');
const { favoritesFields, favoritesTokens } = require('./dbUtils/favorites.db');
const catchAsync = require('../utils/catchAsync');
const { getTokenById } = require('../utils/tokenUtil');
const { getNFTById } = require('../utils/nftUtil');
const { addTrendHistory, deleteTrendHistory, addToNotifications } = require('../utils/trendUtil');
const prisma = new PrismaClient();

const createFavorites = catchAsync(async (req, res) => {
    const { userId, tokenId, NFTId, favorite } = req.body;
    if (favorite) {
        await prisma.Favorites.create({
            data: {
                user_id: userId,
                token_id: tokenId,
                nft_id: NFTId
            },
        });
        if (tokenId) {
            addTrendHistory('token', 'wishlist', tokenId, null, userId);
            addToNotifications('token', 'wishlist', '', tokenId, userId);
        } 
        else {
            addTrendHistory('nft', 'wishlist', NFTId, null, userId);
            addToNotifications('nft', 'wishlist', '', NFTId, userId);
        } 
        
    } else {
        await prisma.Favorites.deleteMany({
            where: { user_id: userId, nft_id: NFTId, token_id: tokenId },
        });
        if (tokenId) deleteTrendHistory('token', 'wishlist', tokenId);
        else deleteTrendHistory('nft', 'wishlist', NFTId);
    }
    res.status(httpStatus.OK).end();
});

const getFavoritesNft = catchAsync(async (req, res) => {
    const { nftId } = req.body;
    const result = await prisma.Favorites.findMany({
        where: {
            nft_id: nftId
        },
        select: favoritesFields,
    });
    res.send(result);
});


const getFavoritesTokens = catchAsync(async (req, res) => {
    const { tokenId } = req.body;
    const result = await prisma.Favorites.findMany({
        where: {
            token_id: tokenId
        },
        distinct: ['token_id'],
        select: favoritesFields,
    });
    res.send(result);
});

const getFavoritesOfUser = catchAsync(async (req, res) => {
    const { userId } = req.params;
    const results = await prisma.Favorites.findMany({
        where: {
            user_id: userId,
        },
        select: favoritesFields,
    });
    let favoriteDetails = {
        token: [],
        nft: [],
    };
    if (results.length > 0) {
        for ({ token_id, nft_id } of results) {
            if (token_id) {
                const tokenDetails = await getTokenById(token_id);
                if (tokenDetails && tokenDetails.status !== 'Deleted')
                    favoriteDetails.token.push(tokenDetails);
            } else {
                const nftDetails = await getNFTById(nft_id);
                if (nftDetails && nftDetails.status === null)
                    favoriteDetails.nft.push(nftDetails);
            }
        }
        res.send(favoriteDetails);
    } else {
        res.status(httpStatus.OK).send([]);
    }
});

module.exports = {
    getFavoritesNft,
    getFavoritesTokens,
    getFavoritesOfUser,
    createFavorites
};
