const axios = require('axios');
const config = require('../config/config');

const instance = axios.create({
  baseURL: config.mirrorNodeBaseUrl,
});

async function fetchAccountInfo(accountId) {
    const { data } = await instance.get(`/accounts/${accountId}`);
    return data;
}

async function fetchTokenInfo(tokenId) {
  try {
    const { data } = await instance.get(`/tokens/${tokenId}`);
    return data;
  } catch (e) {
    return null;
  }
}

async function fetchNFTInfo(tokenId) {
    const { data } = await instance.get(`/tokens/${tokenId}/nfts`);
    return data;
}

module.exports = {
  fetchAccountInfo,
  fetchTokenInfo,
  fetchNFTInfo,
};
