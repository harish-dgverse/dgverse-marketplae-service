const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

const restAPIenv = require('./env');
dotenv.config({ path: path.join(__dirname, '../../.env') });
const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('prod', 'dev', 'test').required(),
    PORT: Joi.number().default(3000),
    ACCESS_TOKEN_SECRET: Joi.string(),
    REFRESH_TOKEN_SECRET: Joi.string(),
    IPFS_API_KEY: Joi.string(),
    HEDERA_PRIVATE_KEY: Joi.string(),
    HEDERA_ACCOUNT_ID: Joi.string(),
    MIRROR_NODE_BASE_URL: Joi.string(),
    HEDERA_NETWORK: Joi.string(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);


if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  ...restAPIenv[envVars.NODE_ENV],
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  accessTokenSecret: envVars.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: envVars.REFRESH_TOKEN_SECRET,
  ipfsApiKey: envVars.IPFS_API_KEY,
  hederaAccId: envVars.HEDERA_ACCOUNT_ID,
  mirrorNodeBaseUrl: envVars.MIRROR_NODE_BASE_URL,
  hederaPrivateKey: envVars.HEDERA_PRIVATE_KEY,
  hederaNetwork: envVars.HEDERA_NETWORK,
};
