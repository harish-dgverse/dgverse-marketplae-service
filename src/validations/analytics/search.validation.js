const Joi = require('joi');

const searchData = {
  query: Joi.object().keys({
    q: Joi.string().required(),
    filterFlag: Joi.string().optional().valid('user', 'nft', 'token').default(null),
  }),
};

module.exports = {
  searchData
};
