const express = require('express');
const validate = require('../../middlewares/validate');
const saleController = require('../../controllers/sale.controller');
const saleValidation = require('../../validations/sale.validation');
const router = express.Router();

router.route('/:nftId')
    .get(validate(saleValidation.getSaleDetails), saleController.getSaleDetails)
router.route('/')
    .post(validate(saleValidation.sendToMarketplace), saleController.sendToMarketplace);
router.route('/change-status').patch(validate(saleValidation.changeStatusOfSale), saleController.changeStatusOfSale);

router.route('/expired').patch(validate(saleValidation.saleExpired), saleController.saleExpired);

module.exports = router;
