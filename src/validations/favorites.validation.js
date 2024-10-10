const Joi = require('joi');

const getFavoritesNft = {
  query: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};

const getFavoritesTokens = {
  query: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};

const getFavoritesOfUser = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};

const createFavorites = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    tokenId:  Joi.string(),
    NFTId:  Joi.string(),
    favorite: Joi.boolean().required(),
  }),
};

module.exports = {
  getFavoritesNft,
  getFavoritesTokens,
  getFavoritesOfUser,
  createFavorites,
};
