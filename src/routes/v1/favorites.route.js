const express = require('express');
const validate = require('../../middlewares/validate');
const favoritesController = require('../../controllers/favorites.controller');
const favoritesValidator = require('../../validations/favorites.validation');

const router = express.Router();

// Get list of user who wishlisted nft
router
  .route('/nft/')
  .get(validate(favoritesValidator.getFavoritesNft), favoritesController.getFavoritesNft)

// Get list of user who wishlisted collection
router
.route('/token/')
.get(validate(favoritesValidator.getFavoritesTokens), favoritesController.getFavoritesTokens)

// Get list of nft and token wishlisted by user
router
.route('/:userId/')
.get(validate(favoritesValidator.getFavoritesOfUser), favoritesController.getFavoritesOfUser)


router
  .route('/')
  .post(validate(favoritesValidator.createFavorites), favoritesController.createFavorites)

module.exports = router;
