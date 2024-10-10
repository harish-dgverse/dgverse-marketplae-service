const Joi = require('joi');

const getFollowers = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    getFollowers: Joi.boolean(),
  }),
};

const createFollowings = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    userTo: Joi.number(),
    follow: Joi.boolean().required(),
  }),
};

module.exports = {
  getFollowers,
  createFollowings,
};
