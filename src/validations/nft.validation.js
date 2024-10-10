const Joi = require('joi');

const mintToken = {
  body: Joi.object().keys({
    nftId: Joi.string(),
    serialNumber: Joi.number(),
    volume: Joi.number(),
    tokenType: Joi.string().required(),
    userId: Joi.number(),
    tokenId: Joi.string().required(),
    metadata: Joi.string(),
    description: Joi.string(),
    tags: Joi.string(),
    name: Joi.string(),
    metadata: Joi.string(),
    totalSupply: Joi.number(),
    images: Joi.object().keys({
      coverPic: Joi.string(),
      displayPic: Joi.string(),
      icon: Joi.string(),
      thumbnail: Joi.string(),
    }),
    socialMedia: Joi.array().items(
      Joi.object().keys({
        media: Joi.string().required(),
        url: Joi.string().required(),
      })
    ),
    additionalDetails: Joi.array().items(
      Joi.object().keys({
        attribute: Joi.string().required(),
        value: Joi.string().required(),
      })
    ),
  }),
};

const getNftDetailsById = {
  params: Joi.object().keys({
    nftId: Joi.string().required(),
  }),
};

const getNftNamesByNftIds = {
  params: Joi.object().keys({
    nftNameIds: Joi.string().required(),
  }),
};

const transferNFT = {
  body: Joi.object().keys({
    identifier: Joi.string(),
    tokenId: Joi.string(),
    tokenType: Joi.string(),
    volume: Joi.number(),
    sellerId: Joi.number(),
    buyerWalletId: Joi.string().required(),
    quotedPrice: Joi.number(),
    saleId: Joi.number(),
    buyerId: Joi.number(),
  }),
};

const burnToken = {
  body: Joi.object().keys({
    tokenId: Joi.string().required(),
    userId: Joi.number(),
    volume: Joi.number(),
    tokenType: Joi.string(),
    serials: Joi.array().items(),
    totalSupply: Joi.number(),
    nftIds: Joi.array().items(Joi.string().allow('')),
  }),
};

const wipeToken = {
  body: Joi.object().keys({
    tokenId: Joi.string().required(),
    wipeAccountId: Joi.string().required(),
    userId: Joi.number(),
    volume: Joi.number(),
    tokenType: Joi.string(),
    totalSupply: Joi.number(),
    nftIds: Joi.array().items(Joi.string().allow('')),
    serials: Joi.array().items(),
  }),
};

module.exports = {
  mintToken,
  burnToken,
  wipeToken,
  getNftDetailsById,
  getNftNamesByNftIds,
  transferNFT,
};
