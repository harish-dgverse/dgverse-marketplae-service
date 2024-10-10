const Joi = require('joi');

const addSearchLog = {
  body: Joi.object().keys({
    uniqueId: Joi.string().required(),
    searchText: Joi.string().required(),
    type: Joi.string().required(),    
    userId: Joi.string().required(),
  }),
};


module.exports = {
    addSearchLog
};
