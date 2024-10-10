const httpStatus = require('http-status');
const { PrismaClient } = require('@prisma/client');
const { followingUserFields, followedUserFields } = require('./dbUtils/followings.db');
const catchAsync = require('../utils/catchAsync');
const prisma = new PrismaClient();
const { addTrendHistory, deleteTrendHistory, addToNotifications } = require('../utils/trendUtil');

const createFollowings = catchAsync(async (req, res) => {
    const { userId, userTo, follow } = req.body;
    if (follow) {
        await prisma.Followings.create({
            data: {
                user_id: userId,
                following_user_id: userTo,
            },
        });
        addTrendHistory('user', 'follow', `${userTo}`, userTo, userId);
        addToNotifications('user', 'follow', userTo, `${userId}`, userId);
    } else {
        await prisma.Followings.deleteMany({
            where: { user_id: userId, following_user_id: userTo },
        });
        deleteTrendHistory('user', 'follow', `${userTo}`, userTo);
    }
    res.status(httpStatus.OK).end();
});

const getFollowers = catchAsync(async (req, res) => {
    const { userId, getFollowers } = req.body;
    if (getFollowers) {
        const result = await prisma.Followings.findMany({
            where: {
                following_user_id: userId,
            },
            select: followedUserFields,
        });
        res.send(result);
    } else {
        const result = await prisma.Followings.findMany({
            where: {
                user_id: userId,
            },
            select: followingUserFields,
        });
        res.send(result);
    }
});

module.exports = {
    getFollowers,
    createFollowings
};
