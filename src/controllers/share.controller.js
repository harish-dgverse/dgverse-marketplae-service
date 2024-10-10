const httpStatus = require('http-status');
const { PrismaClient } = require('@prisma/client');
const catchAsync = require('../utils/catchAsync');
const {addTrendHistory} = require('../utils/trendUtil');
const prisma = new PrismaClient();

const userShare = catchAsync(async (req, res) => {
    const { userId, media, tokenId,  NFTId} = req.body;
    const createResponse = await prisma.UserShare.create({
      data: {
        user_id: userId,
        token_id: tokenId,
        nft_id: NFTId,
        media: media
      },
    });
    if (tokenId) addTrendHistory('token', 'share', tokenId, null, userId);
    else addTrendHistory('nft', 'share', NFTId, null, userId);
    res.status(httpStatus.OK).end();
});


module.exports = {
    userShare
};
