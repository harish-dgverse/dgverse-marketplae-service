const Joi = require('joi');

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('prod', 'dev', 'test').required(),
    PORT: Joi.number().default(5001),
    DATABASE_URL: Joi.string(),
  })
  .unknown();

  module.exports = {
    envVarsSchema
  };
  