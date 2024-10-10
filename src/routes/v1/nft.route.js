const express = require('express');
const validate = require('../../middlewares/validate');
const verifyJWT = require('../../middlewares/verifyJWT');
const { nftController } = require('../../controllers');
const { nftValidation } = require('../../validations');
const router = express.Router();

router.route('/').put(validate(nftValidation.mintToken), nftController.mintToken);
// Burn nft from treasury account
router.route('/burn').post(validate(nftValidation.burnToken), nftController.burnToken);
// wipe nft from all account
router.route('/wipe').post(validate(nftValidation.wipeToken), nftController.wipeToken);
// details of nft using nft id
router.route('/:nftId').get(validate(nftValidation.getNftDetailsById), nftController.getNftDetailsById);
// Transfer of NFT
router
  .route('/transfer')
  .patch(validate(nftValidation.transferNFT), nftController.transferNFT);

router.route('/nftNames/:nftNameIds').get(validate(nftValidation.getNftNamesByNftIds), nftController.getNftNamesByNftIds);


module.exports = router;
