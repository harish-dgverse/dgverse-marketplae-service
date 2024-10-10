const Joi = require('joi');

const upsertSocialMediaEntry = {
  body: Joi.object().keys({
    socialMediaId: Joi.number(),
    media: Joi.string().required(),
    url: Joi.string().required(),
    tokenId: Joi.string().allow(null),
    userId: Joi.number().allow(null),
  }),
};

const deleteSocialMediaEntry = {
  body: Joi.object().keys({
    socialMediaId: Joi.number().required(),
  }),
};

const uploadFile = {
  body: Joi.object().keys({
    fileName: Joi.string().required(),
  }),
};

const viewByUser = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    tokenId:  Joi.string(),
    NFTId:  Joi.string(),
    userProfileId:  Joi.number(),
  }),
};

module.exports = {
  upsertSocialMediaEntry,
  deleteSocialMediaEntry,
  uploadFile,
  viewByUser,
};
