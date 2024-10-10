const express = require('express');
const validate = require('../../middlewares/validate');
const leaderboardController = require('../../controllers/analytics/leaderboard.controller');
const { getLeaderboardData } = require('../../validations/analytics/leaderboard.validation');

const relatedNFTController = require('../../controllers/analytics/related.nft.controller');
const { getRelatedNfts } = require('../../validations/analytics/related.nft.validation');

const searchController = require('../../controllers/analytics/search.controller');
const searchValidation = require('../../validations/analytics/search.validation');
const searchAddLogController = require('../../controllers/analytics/search.result.controller');
const searchAddLogValidation = require('../../validations/analytics/search.log.result.validation');

const { getTrend, resetTrend } = require('../../controllers/analytics/trend/trend.control');
const { getTrendValidation, resetTrendValidation } = require('../../validations/analytics/trend.validation');

const router = express.Router();

router
  .route('/leaderboard')
  .get(validate(getLeaderboardData), leaderboardController.getLeaderboardData);

// Trend
router
  .route('/trend')
  .get(validate(getTrendValidation), getTrend);

router.route('/trend/reset')
  .get(validate(resetTrendValidation), resetTrend);
// Search
router
  .route('/search')
  .get(validate(searchValidation.searchData), searchController.searchData);
  
router
  .route('/search/log-result')
  .post(validate(searchAddLogValidation.addSearchLog), searchAddLogController.addSearchLog);

router.route('/related/:nftId').get(validate(getRelatedNfts), relatedNFTController.getRelatedNfts);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Leaderboard
 *   description: Users leaderboard
 */

/**
 * @swagger
 * /leaderboard/create_user:
 *   post:
 *     summary: Registering a leaderboard user
 *     description: Every new account created users should be regitered in leaderboard
 *     tags: [Leaderboard]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - userId
 *             properties:
 *               userName:
 *                 type: string
 *                 description: User name
 *               userId:
 *                 type: string
 *                 description: User Id
 *             example:
 *               userName: testUserName
 *               userId: "00000"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/LeaderBoard'
 */


/**
 * @swagger
 * /leaderboard/update_user:
 *   post:
 *     summary: Updating the leaderboard user details
 *     description: Every user transactions, follower status will be updated
 *     tags: [Leaderboard]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User Id
 *               followerOptions:
 *                 type: object
 *                 required:
 *                    - follow
 *                    - count
 *                 properties:
 *                    type: string
 *                    count: number
 *               transaction:
 *                 type: object
 *                 required:
 *                    - follow
 *                    - count
 *                 properties:
 *                    type: string
 *                    value: number
 *             example:
 *               userId: "00000"
 *               followerOptions: {"follow": true, "count": 1}
 *               transaction: {"type": "buy", "value": 1}
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/LeaderBoard'
 */

/**
 * @swagger
 * /leaderboard:
 *   post:
 *     summary: Leaderboard details
 *     description: Leaderboard details of Top asset holders, Top buyers, Top sellers, Top followers
 *     tags: [Leaderboard]
 *     security:
 *       - bearerAuth: []
 *           
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/LeaderBoard'
 *                  
 */