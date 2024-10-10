const express = require('express');
const hederaServicesController = require('../../controllers/hederaServices.controller');
const router = express.Router();

router.route('/freeze-with-client').post(hederaServicesController.freezeWithClient);
router.route('/sign-with-client').post(hederaServicesController.signWithClient);

module.exports = router;
