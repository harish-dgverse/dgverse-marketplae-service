const Joi = require('joi');

const getLeaderboardData = {
  body: Joi.object().keys()
}

module.exports = {
  getLeaderboardData
};
