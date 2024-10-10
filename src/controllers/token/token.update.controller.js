const httpStatus = require('http-status');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { updateTokenService } = require('../../services');
const catchAsync = require('../../utils/catchAsync');

const updateToken = catchAsync(async (req, res) => {
  const { token } = req.body;
  const {
    tokenId,
    tokenName,
    treasuryAccount,
    kycKey,
    freezeKey,
    pauseKey,
    wipeKey,
    supplyKey,
    feeScheduleKey,
    symbol,
    newAdminKey,
  } = token;
  await updateTokenService.updateToken(token);
  await prisma.Token.update({
    where: {
      token_id: tokenId,
    },
    data: {
      name: tokenName,
      admin_key: newAdminKey,
      treasury_account: treasuryAccount,
      kyc_key: kycKey,
      freeze_key: freezeKey,
      pause_key: pauseKey,
      wipe_key: wipeKey,
      supply_key: supplyKey,
      fee_schedule_key: feeScheduleKey,
      symbol,
    },
  });
  res.status(httpStatus.OK).end();
});

const updateFreezeStatus = catchAsync(async (req, res) => {
  const { doOperation: freeze_status, tokenId: token_id, accountId } = req.body;
  const wallet = await prisma.Wallet.findUnique({
    where: { wallet_address: accountId },
  });
  if (!wallet) res.status(httpStatus.OK).end();
  await prisma.UserRelationToToken.upsert({
    where: { token_id_wallet_address: { token_id, wallet_address: accountId } },
    update: { freeze_status },
    create: { user_id: wallet.user_id, freeze_status, token_id, wallet_address: accountId },
  });
  res.status(httpStatus.OK).end();
});

const updatePauseStatus = catchAsync(async (req, res) => {
  const { tokenId, doOperation } = req.body;
  const statusToUpdate = doOperation ? 'Paused' : null;
  await prisma.Token.update({
    where: { token_id: tokenId },
    data: { status: statusToUpdate },
  });
  res.status(httpStatus.OK).end();
});

const updateKycStatus = catchAsync(async (req, res) => {
  const { userId: user_id, doOperation: kyc_status, tokenId: token_id, accountId } = req.body;
  const wallet = await prisma.Wallet.findUnique({
    where: { wallet_address: accountId },
  });
  if (!wallet) res.status(httpStatus.OK).end();
  await prisma.UserRelationToToken.upsert({
    where: { token_id_wallet_address: { token_id, wallet_address: accountId } },
    update: { kyc_status },
    create: { user_id: wallet.user_id, kyc_status, token_id, wallet_address: accountId },
  });
  res.status(httpStatus.OK).end();
});

module.exports = {
  updateToken,
  updateFreezeStatus,
  updatePauseStatus,
  updateKycStatus,
};
