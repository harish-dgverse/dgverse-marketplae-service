const express = require('express');
const validate = require('../../middlewares/validate');
const userController = require('../../controllers/user.controller');
const userValidator = require('../../validations/user.validation');

const router = express.Router();

// test url
router
  .route('/:userId/check-token/:tokenId')
  .get(userController.checkTokenAsset);

router
  .route('/:userId')
  .get(validate(userValidator.getUserById), userController.getUserById);

router
  .route('/:userId/assets')
  .get(validate(userValidator.getAssetsOwned), userController.getAssetsOwned);

router.route('/:userId/recent-activity').get(validate(userValidator.getRecentActivity), userController.getRecentActivity);
router.route('/:userId/action-items').get(validate(userValidator.getUserActionItems), userController.getUserActionItems);

router
  .route('/:userId/stats')
  .get(validate(userValidator.getUserStatistics), userController.getUserStatistics);


router.route('/details').patch(validate(userValidator.addUserDetails), userController.addUserDetails);

router.route('/newletterlist').put(validate(userValidator.addToNewletterlist), userController.addToNewletterlist);

router.route('/:userId/notification').get(validate(userValidator.getNotifications), userController.getNotifications);
router.route('/notification/:ntfcnId').patch(validate(userValidator.updateReadFlagNotifications), userController.updateReadFlagNotifications);

module.exports = router;
