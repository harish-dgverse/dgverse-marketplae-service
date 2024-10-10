const superagent = require('superagent');
const { TOKEN_SERVICE_ROOT_URL } = require('../constants').tokenService;

const mintToken = (tokenToMint) => {
  return new Promise((resolve, reject) => {
    superagent
      .post(`${TOKEN_SERVICE_ROOT_URL}/create/mint/`)
      .send({ tokenToMint })
      .set('Accept', 'application/json')
      .end((error, res) => {
        return error ? reject(error?.response?._body) : resolve(res?._body);
      });
  });
};

const burnToken = (tokenDetails) => {
  return new Promise((resolve, reject) => {
    superagent
      .post(`${TOKEN_SERVICE_ROOT_URL}/delete/burn/`)
      .send({ tokenDetails })
      .set('Accept', 'application/json')
      .end((error, res) => {
        error ? reject(error?.response?._body) : resolve(res?._body);
      });
  });
};

const wipeToken = (tokenDetails) => {
  return new Promise((resolve, reject) => {
    superagent
      .post(`${TOKEN_SERVICE_ROOT_URL}/delete/wipe/`)
      .send({ tokenDetails })
      .set('Accept', 'application/json')
      .end((error, res) => {
        error ? reject(error?.response?._body) : resolve(res?._body);
      });
  });
};

const transferNFT = (transferDetails) => {
  return new Promise((resolve, reject) => {
    superagent
      .post(`${TOKEN_SERVICE_ROOT_URL}/update/transfer`)
      .send( transferDetails )
      .set('Accept', 'application/json')
      .end((error, res) => {
        error ? reject(error?.response?._body) : resolve(res?._body);
      });
  });
};

module.exports = {
  mintToken,
  burnToken,
  wipeToken,
  transferNFT,
};
