const express = require('express');
const validate = require('../../middlewares/validate');
const { tokenCreateController, tokenUpdateController, tokenDeleteController, tokenReadController} = require('../../controllers');
const { tokenCreateValidation, tokenUpdateValidation, tokenDeleteValidation, tokenReadValidation} = require('../../validations');
const router = express.Router();

router.route('/create').post(validate(tokenCreateValidation.createToken), tokenCreateController.createToken);

router.route('/history').get(validate(tokenReadValidation.getHistory), tokenReadController.getHistory);

router.route('/freeze-kyc-status').post(validate(tokenReadValidation.checkFreezeKycStatus), tokenReadController.checkFreezeKycStatus);

router
  .route('/:tokenId/stats')
  .get(validate(tokenReadValidation.getTokenStatistics), tokenReadController.getTokenStatistics);

router.route('/update').patch(validate(tokenUpdateValidation.updateToken), tokenUpdateController.updateToken);
// Update freeze status of token
router
  .route('/update/freeze-status')
  .patch(validate(tokenUpdateValidation.updateFreezeStatus), tokenUpdateController.updateFreezeStatus);
// Update pause status of token
router
  .route('/update/pause-status')
  .patch(validate(tokenUpdateValidation.updatePauseStatus), tokenUpdateController.updatePauseStatus);
// Update kyc status of token
router
  .route('/update/kyc-status')
  .patch(validate(tokenUpdateValidation.updateKycStatus), tokenUpdateController.updateKycStatus);

// Delete token class
router.route('/delete').post(validate(tokenDeleteValidation.deleteToken), tokenDeleteController.deleteToken);

// Get token details
router
  .route('/:tokenId')
  .get(validate(tokenReadValidation.getTokenById), tokenReadController.getTokenDetailsById);

// Get token max serial, temp
router
.route('/:tokenId/maxSerial')
.get(tokenReadController.getMaxSerial);


module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Mint NFT
 *   description: Creating NFT and management
 */

/**
 * @swagger
 * /mint-nft:
 *   post:
 *     summary: Create a NFT
 *     description: All users can create NFT. Image will be stored in IPFS, rest of the metadata will be stored in dgVerse DB
 *     tags: [nft, mint-nft]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - artifact
 *               - media_linkage
 *             properties:
 *               artifact:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               media_linkage:
 *                 type: string
 *                 description: social media links
 *             example:
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all users
 *     description: Only admins can retrieve all users.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: User role
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
