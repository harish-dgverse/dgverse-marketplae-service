const { Client, Hbar  } = require('@hashgraph/sdk');

const config = require('../config/config');

const hederaClient = () => {
  const operatorPrivateKey = config.hederaPrivateKey;
  const operatorAccount = config.hederaAccId;
  return hederaClientLocal(operatorAccount, operatorPrivateKey);
};

const hederaClientLocal = (operatorAccount, operatorPrivateKey) => {
  let client;
  switch (config.hederaNetwork.toUpperCase()) {
    case 'TESTNET':
      client = Client.forTestnet();
      break;
    case 'MAINNET':
      client = Client.forMainnet();
      break;
  }
  client.setOperator(operatorAccount, operatorPrivateKey);
  //Set the default maximum transaction fee (in Hbar)
  client.setDefaultMaxTransactionFee(new Hbar(5));

  //Set the maximum payment for queries (in Hbar)
  client.setMaxQueryPayment(new Hbar(50));
  return client;
};

module.exports = {
  hederaClient,
  hederaClientLocal,
};
