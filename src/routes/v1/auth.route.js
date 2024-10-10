const express = require('express');
const router = express.Router();
const validate = require('../../middlewares/validate');
const verifyJWT = require('../../middlewares/verifyJWT');
const authController = require('../../controllers/auth.controller');
const authValidation = require('../../validations/auth.validation');

router
    .route('/login')
    .patch(validate(authValidation.login), authController.login);
router.route('/refresh').get(authController.refreshToken);
router.route('/logout').get(verifyJWT, authController.logout);

module.exports = router;
