const Joi = require('joi');

const createMetadataCid = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().required(),
    imageBlob: Joi.any().required(),
    properties: Joi.object().optional(),
  }),
};

module.exports = {
  createMetadataCid,
};
