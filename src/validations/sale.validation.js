const Joi = require('joi');

const getSaleDetails = {
  params: Joi.object().keys({
    nftId: Joi.string().required(),
  }),
};


const sendToMarketplace = {
  body: Joi.object().keys({
    identifier: Joi.string(),
    tokenType: Joi.string(),
    quotedPrice: Joi.number(),
    volume: Joi.number(),
    tokenType: Joi.string(),
    sellerId: Joi.number(),
    expiresAt: Joi.date(),
  }),
};

const changeStatusOfSale = {
  body: Joi.object().keys({
    saleId: Joi.number().required(),
  }),
};

const saleExpired = {
  body: Joi.object().keys({
    nftId: Joi.string().required(),
  }),
};

module.exports = {
  getSaleDetails,
  sendToMarketplace,
  changeStatusOfSale,
  saleExpired,
};
