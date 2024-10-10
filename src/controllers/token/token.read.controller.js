const httpStatus = require('http-status');
const { PrismaClient } = require('@prisma/client');
const catchAsync = require('../../utils/catchAsync');
const prisma = new PrismaClient();
const { getTokenById } = require('../../utils/tokenUtil');

const { getNftCreated, getAllHbrCreated } = require('../utils/statsUtils');

const getHistory = catchAsync(async (req, res) => {
  const { tokenDetails } = req.body;
  res.status(httpStatus.OK).end();
});

const getMaxSerial = catchAsync(async (req, res) => {
  const { tokenId } = req.params;
  const groupUsers = await prisma.NFT.groupBy({
    by: ['token_id'],
    where: {
      token_id: tokenId,
    },
    _max: {
      serial_number: true,
    },
  })
  const max = groupUsers[0]._max.serial_number;
  res.send({ max });
});

const getTokenDetailsById = catchAsync(async (req, res) => {
  const { tokenId } = req.params;
  const { loggedUserId: currentUserId } = req.query;
  const result = await getTokenById(tokenId, currentUserId);
  if (!result) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: 'No results' });
  }
  res.status(httpStatus.OK).send(result);
});

const getTokenStatistics = catchAsync(async (req, res) => {
  const { tokenId } = req.params;
  const result = await getTokenById(tokenId);
  const nftCount = {
    "whereClause": {
      token_id: tokenId, OR: [
        {
          status: null,
        },
        { status: { in: ['Paused'] } },
      ],
    }, "groupByColumn": 'token_id'
  };
  const saleAmountNFT = {
    "whereClause": {
      nftId: {
        startsWith: tokenId
      }, status: "COMPLETED"
    }, "groupByColumn": 'nftId'
  };
  const saleAmountFT = {
    "whereClause": {
      tokenId,
      status: "COMPLETED"
    }, "groupByColumn": 'tokenId'
  };
  const tokenStatistics = [];
  const getTokensMintedofST = async (socialTokenDetails) => {
    const tokensMinted = socialTokenDetails.reduce(
      (accumulator, { volume }) => accumulator + volume,
      0
    );
    const tokensInMarket = socialTokenDetails.reduce(
      (accumulator, { saleDetails }) => {
        if (saleDetails) {
          return accumulator + saleDetails.volume;
        } else return accumulator + 0;
      },
      0
    );
    return { tokensMinted, tokensInMarket }
  };
  if (result && result.token_type === 'ft') {
    const { tokensMinted, tokensInMarket } = await getTokensMintedofST(result.SocialToken);
    tokenStatistics.push({
      type: 'tokensMinted',
      label: 'Tokens minted',
      value: tokensMinted,
    }, {
      type: 'tokensInMarket',
      label: 'Tokens in market',
      value: tokensInMarket,
    });
    tokenStatistics.push(await getAllHbrCreated(saleAmountFT));
  } else {
    tokenStatistics.push(await getAllHbrCreated(saleAmountNFT),
      await getNftCreated(nftCount))
  }
  res.send(tokenStatistics.filter(x => x));
});

const checkFreezeKycStatus = catchAsync(async (req, res) => {
  const { tokenId, walletAddress, selectedAction } = req.body;
  const result = await prisma.UserRelationToToken.findUnique({
    where: { token_id_wallet_address: { token_id: tokenId, wallet_address: walletAddress } },
  });
  if (!result) return res.status(httpStatus.OK).end();
  console.log(result, selectedAction);
  let status = httpStatus.OK;
  switch (selectedAction) {
    case 'freeze':
      if (result.freeze_status) status = httpStatus.CONFLICT;
      break;
    case 'unfreeze':
      if (!result.freeze_status) status = httpStatus.CONFLICT;
      break;
    case 'enableKyc':
      if (result.kyc_status) status = httpStatus.CONFLICT;
      break;
    case 'disableKyc':
      if (!result.kyc_status) status = httpStatus.CONFLICT;
      break;
    default:
      break;
  }
  console.log(status);
  res.status(status).end();
});

module.exports = {
  getHistory,
  getTokenDetailsById,
  getTokenStatistics,
  getMaxSerial,
  checkFreezeKycStatus,
};
