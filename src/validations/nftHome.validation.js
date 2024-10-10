const Joi = require('joi');

const getNftDetailsById = {
  params: Joi.object().keys({
    nftId: Joi.string().required(),
  }),
};


module.exports = {
  getNftDetailsById,
};