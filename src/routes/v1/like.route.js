const express = require('express');
const validate = require('../../middlewares/validate');
const likeController = require('../../controllers/like.controller');
const likeValidator = require('../../validations/like.validation');
const router = express.Router();

router
.route('/')
.post(validate(likeValidator.userLike), likeController.userLike)

module.exports = router;
