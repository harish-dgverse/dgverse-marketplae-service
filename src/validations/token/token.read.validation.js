const Joi = require('joi');

const getHistory = {
  body: Joi.object().keys({
    tokenDetails: Joi.object().keys({
      tokenId: Joi.string().required(),
      adminKey: Joi.string().required(),
    }),
  }),
};
const getTokenStatistics = {
  params: Joi.object().keys({
    tokenId: Joi.string().required(),
  }),
};

const getTokenById = {
  params: Joi.object().keys({
    tokenId: Joi.string().required(),
  }),
};

const checkFreezeKycStatus = {
  body: Joi.object().keys({
    tokenId: Joi.string().required(),
    walletAddress: Joi.string().required(),
    selectedAction: Joi.string().required(),
  }),
};

module.exports = {
  getHistory,
  getTokenById,
  getTokenStatistics,
  checkFreezeKycStatus,
};
