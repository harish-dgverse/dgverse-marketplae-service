const express = require('express');
const validate = require('../../middlewares/validate');
const emailController = require('../../controllers/email.controller');
const emailValidator = require('../../validations/email.validation');

const router = express.Router();

router
.route('/')
.post(validate(emailValidator.contactDetails), emailController.email)


module.exports = router;
