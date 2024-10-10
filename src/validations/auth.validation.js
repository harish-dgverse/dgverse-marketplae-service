const Joi = require('joi');

const login = {
  body: Joi.object().keys({
    walletAddress: Joi.string().required(),
  }),
}

module.exports = {
  login,
};
