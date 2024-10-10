const superagent = require('superagent');
const { getServiceClient } = require('../utils/getServiceClient.js');

/**
 * Create a token
 * @param {Object} userBody
 * @returns {Object}
 */
const createToken = (token) => {
  const tokenService = getServiceClient('hedera-service');
  return new Promise((resolve, reject) => {
    superagent
      .post(`${tokenService}create/`)
      .send({ token })
      .set('Accept', 'application/json')
      .end((error, res) => {
        error ? reject(error) : resolve(res);
      });
  });
};
module.exports = {
  createToken,
};
