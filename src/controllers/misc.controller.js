const { PrismaClient } = require('@prisma/client');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const prisma = new PrismaClient();
const { addTrendHistory } = require('../utils/trendUtil');

const upsertSocialMediaEntry = catchAsync(async (req, res) => {
  const { media, url, tokenId, userId } = req.body;
  let { socialMediaId } = req.body;
  // socialMediaId is PK, it can't have 0 as value. So instead of having 2 queries, we can implement with a single go
  if (!socialMediaId) socialMediaId = 0;
  const upsertResponse = await prisma.SocialMedia.upsert({
    where: { social_media_id: socialMediaId },
    update: { media, url },
    create: { media, url, token_id: tokenId, user_id: userId },
  });
  res.send(upsertResponse);
});

const deleteSocialMediaEntry = catchAsync(async (req, res) => {
  const { socialMediaId } = req.body;
  await prisma.SocialMedia.delete({
    where: { social_media_id: socialMediaId },
  });
  res.end();
});

const uploadFile = catchAsync(async (req, res, next) => {
  if (req.file) {
    const fileUrl = req.file.path;
    res.send({
      fileUrl,
    });
  } else res.status(400).end()
});

const viewByUser = catchAsync(async (req, res) => {
  const { userId, tokenId,  NFTId, userProfileId } = req.body;
  const createResponse = await prisma.userView.create({
    data: {
      user_id: userId,
      token_id: tokenId,
      nft_id: NFTId,
      userProfileId: userProfileId,
    },
  });
  if (tokenId) addTrendHistory('token', 'views', tokenId, null, userId);
  else if(NFTId) addTrendHistory('nft', 'views', NFTId, null, userId);
  else if(userProfileId) addTrendHistory('user', 'views', `${userProfileId}`, userProfileId, userId);
  res.status(httpStatus.OK).end();
});

module.exports = {
  upsertSocialMediaEntry,
  deleteSocialMediaEntry,
  uploadFile,
  viewByUser,
};
