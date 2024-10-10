const httpStatus = require('http-status');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const generateAccessToken = (user) => {
  return jwt.sign(user, config.accessTokenSecret, {
    expiresIn: "30s",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, config.refreshTokenSecret, {
    expiresIn: "1d",
  });
};

const login = catchAsync(async (req, res) => {
  const { walletAddress } = req.body;
  let status = httpStatus.OK;
  const response = await prisma.wallet.findUnique({
    where: {
      wallet_address: walletAddress,
    },
    select: {
      user: {
        select: {
          user_id: true,
          user_name: true,
          user_role: true,
          subscriptionType: true,
          verified: true,
          timestamp: true,
          Wallet: {
            select: {
              wallet_address: true,
            }
          },
          image: true
        }
      },
    }
  });
  if (response) {
    const user = response.user;
    const userDetails = { user_id: user.user_id,
      user_name: user.user_name,
      user_role: user.user_role,
      subscriptionType: user.subscriptionType,
      verified: user.verified,
      wallet_address: user.Wallet[0].wallet_address,
      image_icon: user.image?.icon }
    const accessToken = generateAccessToken(userDetails);
    const refreshToken = generateRefreshToken(userDetails);
    await prisma.refreshToken.create({
      data: {
        userId: user.user_id,
        refToken: refreshToken
      }
    });
    res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(status).send({
      user: userDetails,
      accessToken,
    });
  } else res.status(httpStatus.NO_CONTENT).end();
});

const refreshToken = catchAsync(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const foundUser = await prisma.refreshToken.findUnique({
    where: {
      refToken: refreshToken
    },
    select: {
      userId: true,
      user: {
        select: {
          Wallet: {
            select: {
              wallet_address: true
            }
          },
          image: {
            select: {
              icon: true
            }
          }
        }
      }
    }
  });
  if (!foundUser) return res.sendStatus(403);
  jwt.verify(
    refreshToken,
    config.refreshTokenSecret,
    (err, decoded) => {
      if (err || foundUser.userId !== decoded.user_id) return res.sendStatus(403);
      const userDetails = { user_id: decoded.user_id, 
        user_name: decoded.user_name, 
        user_role: decoded.user_role,
        subscriptionType: decoded.subscriptionType,
        verified: decoded.verified,
        wallet_address: foundUser.user.Wallet[0].wallet_address, 
        image_icon: foundUser.user.image?.icon }
      const accessToken = generateAccessToken(userDetails);
      res.status(200).send({
        user: userDetails,
        accessToken,
      });
    }
  );
});

const logout = catchAsync(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  await prisma.refreshToken.delete({
    where: {
      refToken: refreshToken
    },
  });

  res.clearCookie('jwt', { httpOnly: true, secure: true });
  res.sendStatus(204);
});

module.exports = {
  login,
  refreshToken,
  logout,
  generateAccessToken,
  generateRefreshToken,
};
