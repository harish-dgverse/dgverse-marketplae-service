const express = require('express');
const validate = require('../../middlewares/validate');
const followingsController = require('../../controllers/followings.controller');
const followingsValidator = require('../../validations/followings.validation');

const router = express.Router();

router
  .route('/')
  .get(validate(followingsValidator.getFollowers), followingsController.getFollowers)
  .post(validate(followingsValidator.createFollowings), followingsController.createFollowings)

module.exports = router;
