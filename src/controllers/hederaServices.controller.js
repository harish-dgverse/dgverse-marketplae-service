const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {Transaction, PrivateKey} = require('@hashgraph/sdk');

const config = require('../config/config');
const { hederaClient } = require('../services/hedera.client');
const client = hederaClient();

const freezeWithClient = catchAsync(async (req, res) => {
  console.log(req.body);
  const bytes = Buffer.from(req.body.transBytes, "hex");
  const transaction = Transaction.fromBytes(bytes);
  transaction.freeze(client);
  const transactionOutBytes = Buffer.from(transaction.toBytes()).toString("hex");
  res.status(httpStatus.OK).send({transactionOutBytes});
});

const signWithClient = catchAsync(async (req, res) => {
  console.log(req.body);
  console.log(req.body);
  const operatorPrivateKey = PrivateKey.fromString(config.hederaPrivateKey);
  const bytes = Buffer.from(req.body.transBytes, "hex");
  const transaction = Transaction.fromBytes(bytes);
  transaction.freeze(client);
  const tx = await transaction.sign(operatorPrivateKey);
  const transactionOutBytes = Buffer.from(transaction.toBytes()).toString("hex");
  res.status(httpStatus.OK).send({transactionOutBytes});
});

module.exports = {
  freezeWithClient,
  signWithClient,
};
