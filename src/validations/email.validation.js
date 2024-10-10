const Joi = require('joi');

const contactDetails = {
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string(),
    role: Joi.string(),
    otherRole: Joi.string(),
    companyName: Joi.string(),
    businessFunction: Joi.string(),
    comments: Joi.string(),
    reason: Joi.string(),
    source: Joi.string()
  }),
};

module.exports = {
  contactDetails,
};
