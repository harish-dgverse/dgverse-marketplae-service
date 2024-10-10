const superagent = require('superagent');
const { TOKEN_SERVICE_ROOT_URL } = require('../../constants').tokenService;

const updateToken = (tokenDetails) => {
  return new Promise((resolve, reject) => {
    superagent
      .post(`${TOKEN_SERVICE_ROOT_URL}/update/all`)
      .send({ tokenDetails })
      .set('Accept', 'application/json')
      .end((error, res) => {
        error ? reject(error?.response?._body) : resolve(res?._body);
      });
  });
};

const updateFreezeStatus = (tokenDetails) => {
  return new Promise((resolve, reject) => {
    superagent
      .post(`${TOKEN_SERVICE_ROOT_URL}/update/freeze-status`)
      .send({ tokenDetails })
      .set('Accept', 'application/json')
      .end((error, res) => {
        error ? reject(error?.response?._body) : resolve(res?._body);
      });
  });
};

const updatePauseStatus = (tokenDetails) => {
  return new Promise((resolve, reject) => {
    superagent
      .post(`${TOKEN_SERVICE_ROOT_URL}/update/pause-status`)
      .send({ tokenDetails })
      .set('Accept', 'application/json')
      .end((error, res) => {
        error ? reject(error?.response?._body) : resolve(res?._body);
      });
  });
};

const updateKycStatus = (tokenDetails) => {
  return new Promise((resolve, reject) => {
    superagent
      .post(`${TOKEN_SERVICE_ROOT_URL}/update/kyc-status`)
      .send({ tokenDetails })
      .set('Accept', 'application/json')
      .end((error, res) => {
        error ? reject(error?.response?._body) : resolve(res?._body);
      });
  });
};

module.exports = {
  updateToken,
  updateFreezeStatus,
  updatePauseStatus,
  updateKycStatus,
};
