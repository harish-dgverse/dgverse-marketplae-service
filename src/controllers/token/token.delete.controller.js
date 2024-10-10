const httpStatus = require('http-status');
const { PrismaClient } = require('@prisma/client');
const catchAsync = require('../../utils/catchAsync');
const prisma = new PrismaClient();
const {deleteTokenHistory} = require('../../utils/trendUtil');

const deleteToken = catchAsync(async (req, res) => {
  const { tokenId } = req.body;
  await prisma.Token.update({
    where: { token_id: tokenId },
    data: { status: 'Deleted' },
  });
  await prisma.NFT.updateMany({
    where: { token_id: tokenId, status: null },
    data: { status: 'Burned' },
  });
  deleteTokenHistory(tokenId, {tokenDeleted: true});
  res.status(httpStatus.OK).end();
});

module.exports = {
  deleteToken,
};
