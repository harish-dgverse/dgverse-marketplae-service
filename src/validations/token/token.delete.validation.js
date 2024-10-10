const Joi = require('joi');

const deleteToken = {
  body: Joi.object().keys({
    tokenId: Joi.string().required(),
  }),
};

module.exports = {
  deleteToken,
};
