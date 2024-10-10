const Joi = require('joi');

const userShare = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    media: Joi.string().required(),
    tokenId:  Joi.string(),
    NFTId:  Joi.string(),
  }),
};

module.exports = {
    userShare,
};
