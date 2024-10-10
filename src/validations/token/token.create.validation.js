const Joi = require('joi');

const createToken = {
  body: Joi.object().keys({
    tokenId: Joi.string().required(),
    name: Joi.string().required(),
    symbol: Joi.string(),
    decimal: Joi.number(),
    treasuryAccount: Joi.string(),
    customFees: Joi.object(),
    maxSupply: Joi.number(),
    initialSupply: Joi.number(),
    supplyType: Joi.string(),
    tokenType: Joi.string().required(),
    tokenCategory: Joi.string(),
    audienceTarget: Joi.string(),
    ftAudience: Joi.string(),
    contactName: Joi.string(),
    contactEmail: Joi.string(),
    useCaseDesc: Joi.string(),
    ftEarnMethod: Joi.string(),
    ftSpendMethod: Joi.string(),
    ftMarket: Joi.string(),
    lineOfBusiness: Joi.string(),
    saleVolume: Joi.number(),
    salePrice: Joi.number(),
    saleExpiresAt: Joi.date(),
    sendToMarketplace: Joi.boolean(),
    description: Joi.string().allow(''),
    tags: Joi.string(),
    defaultFreezeStatus: Joi.boolean(),
    kycKey: Joi.boolean(),
    freezeKey: Joi.boolean(),
    wipeKey: Joi.boolean(),
    customFeeKey: Joi.boolean(),
    pauseKey: Joi.boolean(),
    immutable: Joi.boolean(),
    autoRenewDate: Joi.date(),
    royaltyStatus: Joi.boolean(),
    royaltyPercent: Joi.string(),
    value: Joi.string(),
    socialMedia: Joi.array().items(
      Joi.object().keys({
        media: Joi.string().required(),
        url: Joi.string().required(),
        value: Joi.string(),
      })
    ),
    additionalDetails: Joi.array().items(
      Joi.object().keys({
        attribute: Joi.string().required(),
        value: Joi.string().required(),
      })
    ),
    images: Joi.object().keys({
      coverPic: Joi.string(),
      displayPic: Joi.string().required(),
      icon: Joi.string().required(),
      thumbnail: Joi.string().required(),
    }),
    userId: Joi.number().required(),
  }),
};

module.exports = {
  createToken,
};
