const express = require('express');
const validate = require('../../middlewares/validate');
const miscController = require('../../controllers/misc.controller');
const miscValidation = require('../../validations/misc.validation');
const fileUploadUtil = require('../../utils/fileUpload');

const router = express.Router();

router
  .route('/social-media')
  .put(validate(miscValidation.upsertSocialMediaEntry), miscController.upsertSocialMediaEntry)
  .delete(validate(miscValidation.deleteSocialMediaEntry), miscController.deleteSocialMediaEntry);

router
  .route('/view')
  .put(validate(miscValidation.viewByUser), miscController.viewByUser)

router.route('/upload-file').put(fileUploadUtil.upload.single('fileToUpload'), miscController.uploadFile);

module.exports = router;
