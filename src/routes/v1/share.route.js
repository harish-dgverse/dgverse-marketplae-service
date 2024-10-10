const express = require('express');
const validate = require('../../middlewares/validate');
const shareController = require('../../controllers/share.controller');
const shareValidator = require('../../validations/share.validation');

const router = express.Router();

router
.route('/')
.post(validate(shareValidator.userShare), shareController.userShare)


module.exports = router;
