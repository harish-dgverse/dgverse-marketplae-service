const Joi = require('joi');

const filterValidations = {
  filterOptions: Joi.string().optional().allow(''),
  sortOrder: Joi.string(),
  page: Joi.number(),
  limit: Joi.number(),
}

const filterNFT = {
  query: Joi.object().keys({
    ...filterValidations,
    filterByToken: Joi.string().allow(''),
    filterByUser: Joi.string().allow(''),
    favoriteOnly: Joi.boolean(),
    excludeNft: Joi.string().allow(''),
  }),
};

const filterToken = {
  query: Joi.object().keys({
    ...filterValidations,
    filterByUser: Joi.string().allow(''),
    filterByToken: Joi.string().allow(''),
    favoriteOnly: Joi.boolean(),
  }),
};

module.exports = {
  filterNFT,
  filterToken,
};
