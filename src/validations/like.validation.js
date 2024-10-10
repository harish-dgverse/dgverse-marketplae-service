const Joi = require('joi');

const userLike = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    like: Joi.boolean().required(),
    tokenId:  Joi.string(),
    NFTId:  Joi.string(),
  }),
};

module.exports = {
    userLike,
};
