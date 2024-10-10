const Joi = require('joi');

const updateKeys = {
  tokenId: Joi.string().required(),
  userId: Joi.number().required(),
  doOperation: Joi.boolean(),
};

const updateToken = {
  body: Joi.object().keys({
    token: Joi.object().keys({
      tokenId: Joi.string().required(),
      nft: Joi.boolean().required(),
      tokenName: Joi.string().required(),
      symbol: Joi.object(),
      treasuryAccount: Joi.string(),
      treasuryKey: Joi.string(),
      adminKey: Joi.string(),
      kycKey: Joi.string(),
      freezeKey: Joi.string(),
      wipeKey: Joi.string(),
      supplyKey: Joi.string(),
      feeScheduleKey: Joi.string(),
      pauseKey: Joi.string(),
      newAdminKey: Joi.string(),
      customFees: Joi.object(),
      maxSupply: Joi.number(),
      supplyType: Joi.string(),
      expirationTime: Joi.string(),
    }),
  }),
};

const updateFreezeStatus = {
  body: Joi.object().keys({
    tokenId: Joi.string().required(),
    accountId: Joi.string().required(),
    userId: Joi.number().required(),
    doOperation: Joi.boolean().required(),
  }),
};

const updatePauseStatus = {
  body: Joi.object().keys({
    tokenId: Joi.string().required(),
    doOperation: Joi.boolean(),
  }),
};

const updateKycStatus = {
  body: Joi.object().keys({
    ...updateKeys,
    accountId: Joi.string().required(),
  }),
};

module.exports = {
  updateToken,
  updateFreezeStatus,
  updatePauseStatus,
  updateKycStatus,
};
