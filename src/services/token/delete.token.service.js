const superagent = require('superagent');
const { TOKEN_SERVICE_ROOT_URL } = require('../../constants').tokenService;

const deleteToken = (tokenDetails) => {
  return new Promise((resolve, reject) => {
    superagent
      .post(`${TOKEN_SERVICE_ROOT_URL}/delete/`)
      .send({ tokenDetails })
      .set('Accept', 'application/json')
      .end((error, res) => {
        error ? reject(error?.response?._body) : resolve(res?._body);
      });
  });
};

module.exports = {
  deleteToken,
};
