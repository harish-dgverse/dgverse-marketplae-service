const Joi = require('joi');

const getUserById = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};

const getAssetsOwned = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
  query: Joi.object().keys({
    collectionsOwned: Joi.boolean().optional(),
    nftOwned: Joi.boolean().optional(),
    nftCreated: Joi.boolean().optional(),
    nftCollected: Joi.boolean().optional(),
    nftOnSale: Joi.boolean().optional(),
    ftOnSale: Joi.boolean().optional(),
  }),
};

const getRecentActivity = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};

const getUserActionItems = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};

const getUserStatistics = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};

const addUserDetails = {
  body: Joi.object().keys({
    userName: Joi.string(),
    email: Joi.string(),
    subscriptionType: Joi.string(),
    walletAddress: Joi.string(),
    userId: Joi.number(),
    operation: Joi.string(),
    verified: Joi.number(),
    images: Joi.object().keys({
      cover_pic: Joi.string(),
      display_pic: Joi.string(),
      icon: Joi.string(),
      thumbnail: Joi.string(),
    }),
    socialMedia: Joi.array().items(
      Joi.object().keys({
        media: Joi.string().required(),
        url: Joi.string().required(),
      })
    ),
    targetAudience: Joi.string().allow(''),
    ftAudience: Joi.string().allow(''),
    ftAudienceOthers: Joi.string().allow(''),
    website: Joi.string().allow(''),
    teamSize: Joi.string().allow(''),
    source: Joi.string().allow(''),
    sourceOthers: Joi.string().allow(''),
  }),
};

const addToNewletterlist = {
  body: Joi.object().keys({
    email: Joi.string().required(),
  }),
};

const getNotifications = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
  query: Joi.object().keys({
    groupByDate: Joi.boolean(),
  }),
};

const updateReadFlagNotifications = {
  params: Joi.object().keys({
    ntfcnId: Joi.number().required(),
  }),
};

module.exports = {
  getUserById,
  getAssetsOwned,
  getRecentActivity,
  getUserActionItems,
  getUserStatistics,
  addUserDetails,
  addToNewletterlist,
  getNotifications,
  updateReadFlagNotifications,
};
