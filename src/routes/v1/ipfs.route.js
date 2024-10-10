const express = require('express');
const validate = require('../../middlewares/validate');
const ipfsController = require('../../controllers/ipfs.controller');
const ipfsValidation = require('../../validations/ipfs.validation');
const router = express.Router();

router.route('/metadata').put(validate(ipfsValidation.createMetadataCid), ipfsController.createMetadataCid);

module.exports = router;
