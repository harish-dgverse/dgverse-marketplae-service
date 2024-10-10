const superagent = require('superagent');
const { TOKEN_SERVICE_ROOT_URL } = require('../../constants').tokenService;

const getTokenInfo = (tokenId) => {
  return new Promise((resolve, reject) => {
    superagent
      .get(`${TOKEN_SERVICE_ROOT_URL}/get/info/`)
      .send({ tokenId })
      .set('Accept', 'application/json')
      .end((error, res) => {
        error ? reject(error?.response?._body) : resolve(res?._body);
      });
  });
};
module.exports = {
  getTokenInfo,
};
