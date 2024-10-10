const Joi = require('joi');

const getRelatedNfts = {
  params: Joi.object().keys({
    nftId: Joi.string().required(),
  }),
}

module.exports = {
  getRelatedNfts
};
