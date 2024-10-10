const express = require('express');
const validate = require('../../middlewares/validate');
const artifactListingController = require('../../controllers/artifactListing.controller');
const artifactListingValidation = require('../../validations/artifactListing.validation');
const router = express.Router();

router.route('/nft').get(validate(artifactListingValidation.filterNFT), artifactListingController.filterNFT);

router.route('/token').get(validate(artifactListingValidation.filterToken), artifactListingController.filterToken);

module.exports = router;
