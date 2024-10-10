const httpStatus = require('http-status');
const { PrismaClient } = require('@prisma/client');
const { favoritesFields, favoritesTokens } = require('./dbUtils/favorites.db');
const catchAsync = require('../utils/catchAsync');
const prisma = new PrismaClient();
const { addTrendHistory, deleteTrendHistory, addToNotifications } = require('../utils/trendUtil');

const userLike = catchAsync(async (req, res) => {
  const { userId, tokenId, NFTId, like } = req.body;
  if (like) {
    await prisma.UserLike.create({
      data: {
        user_id: userId,
        token_id: tokenId,
        nft_id: NFTId,
        like: true
      },
    });
    if (tokenId) {
      addTrendHistory('token', 'like', tokenId, null, userId);
      addToNotifications('token', 'like', '', tokenId, userId);
    }
    else {
      addTrendHistory('nft', 'like', NFTId, null, userId);
      addToNotifications('nft', 'like', '', NFTId, userId);
    }
  } else {
    await prisma.UserLike.deleteMany({
      where: { user_id: userId, token_id: tokenId, nft_id: NFTId },
    });
    if (tokenId) deleteTrendHistory('token', 'like', tokenId);
    else deleteTrendHistory('nft', 'like', NFTId);
  }
  res.status(httpStatus.OK).end();
});

module.exports = {
  userLike,
};
