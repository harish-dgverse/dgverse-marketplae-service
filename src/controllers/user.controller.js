const httpStatus = require('http-status');
const { PrismaClient } = require('@prisma/client');
const catchAsync = require('../utils/catchAsync');
const { getIdentiferName } = require('../utils/trendUtil');
const { generateAccessToken, generateRefreshToken } = require('./auth.controller');
const prisma = new PrismaClient();
const moment = require('moment');
const { addTrendHistory } = require('../utils/trendUtil');

const { getConditionXDaysBefore } = require('./utils/timeUtils');

const { collectionsOwnedFields, nftOwnedFields, nftOnSaleFields } = require('./dbUtils/user.db');
const { getUserDetailsById } = require('../utils/userUtil');

const { getOnSaleActionItems,
  getAuctionBidActionItems,
  getOfferPlacingActionItems,
} = require('./utils/actionItemUtils');

const { getAllCollectionsCreated,
  getAllHbrCreated,
  getNftOwned,
  getNftCreated, } = require('./utils/statsUtils');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'arunbaby911@gmail.com',
    pass: 'vxhghqnqeimzqlia'
  }
});

async function renderEmailTemplate(templateName, data) {
  const templatePath = path.join(__dirname, 'views', `${templateName}.ejs`);
  const templateContent = await fs.promises.readFile(templatePath, 'utf-8');
  return ejs.render(templateContent, data);
}

const getUserById = catchAsync(async (req, res) => {
  const { userId } = req.params;
  let { loggedUserId: currentUserId } = req.query;
  const user = await getUserDetailsById(userId, currentUserId);
  if (!user) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: 'No results' });
  }
  res.send(user);
});

const getAssetsOwned = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { collectionsOwned, nftOwned, nftCreated, nftCollected, nftOnSale, ftOnSale } = req.query;
  let assets = {};
  assets.collectionsOwned = [];
  assets.nftOwned = [];
  assets.nftCreated = [];
  assets.nftCollected = [];
  assets.nftOnSale = [];
  assets.ftOnSale = [];
  if (collectionsOwned || ftOnSale) {
    let resultFt = await prisma.socialToken.findMany({
      where: {
        ownedBy: userId,
        volume: {
          gt: 0
        },
      },
      select: {
        token_id: true
      },
    });
    const ftTokenIds = resultFt.map(item => item.token_id);
    let result = await prisma.Token.findMany({
      where: {
        OR: [
          {
            user_id: userId,
            OR: [
              {
                status: null,
              },
              { status: { in: ['Paused'] } },
            ],
          },
          {
            token_id: { in: ftTokenIds }
          }
        ]
        // user_id: userId,
        // OR: [
        //   {
        //     status: null,
        //   },
        //   { status: { in: ['Paused'] } },
        // ],
      },
      select: collectionsOwnedFields,
    });
    result = result.map(item => {
      return {
        ...item,
        saleDetails: item.Sale,
        salePrice: item.Sale?.[0]?.quotedPrice,
        inMarketCount: item.token_type === 'ft' ? item.Sale.reduce((accumulator, currentValue) => accumulator + currentValue.volume, 0) : item.Sale?.length,
      }
    });
    if (collectionsOwned) assets.collectionsOwned = result.slice(0, 10);
    if (ftOnSale) {
      assets.ftOnSale = result.filter(item => item.saleDetails?.length > 0 && item.token_type === 'ft' && item.saleDetails.some(saleItem => saleItem.sellerId === userId)).slice(0, 10);
    }
  }
  if (nftOwned || nftOnSale) {
    let nftOwned = await prisma.NFT.findMany({
      where: {
        user_id: userId,
        status: null,
      },
      select: nftOwnedFields,
    });
    nftOwned = nftOwned.map(item => {
      return {
        ...item,
        saleDetails: item.Sale,
        salePrice: item.Sale?.[0]?.quotedPrice,
        nft_type: item.token.token_type,
      }
    });
    if (nftOwned) {
      assets.nftOwned = nftOwned.slice(0, 10);
    }
    if (nftOnSale) {
      assets.nftOnSale = nftOwned.filter(item => item.saleDetails?.length > 0).slice(0, 10);
    }
  }
  if (nftCreated) {
    let nftCreated = await prisma.Token.findMany({
      where: {
        user_id: userId,
        OR: [
          {
            status: null,
          },
          { status: { in: ['Paused'] } },
        ],
      },
      select: {
        user_id: true,
        nft: {
          where: { user_id: userId, status: null },
          select: nftOwnedFields
        },
      },
    })
    if (nftCreated.length > 0)
      assets.nftCreated = nftCreated.filter(x => x.nft?.length > 0).map(x => {
        return {
          ...x.nft[0],
          saleDetails: x.nft[0].Sale,
          salePrice: x.nft[0].Sale?.[0]?.quotedPrice,
        }
      }).slice(0, 10);
  }
  if (nftCollected) {
    let nftCollected = await prisma.Token.findMany({
      where: {
        NOT: { user_id: userId },
        OR: [
          {
            status: null,
          },
          { status: { in: ['Paused'] } },
        ],
      },
      select: {
        user_id: true,
        nft: {
          where: { user_id: userId, status: null },
          select: nftOwnedFields
        },
      },
    })
    if (nftCollected.length > 0) {
      assets.nftCollected = nftCollected.filter(x => x.nft?.length > 0).map(x => {
        return {
          ...x.nft[0],
          saleDetails: x.nft[0].Sale,
          salePrice: x.nft[0].Sale?.[0]?.quotedPrice,
        }
      }).slice(0, 10);
    }
  }
  res.send(assets);
});

const getRecentActivity = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const actionerName = await getIdentiferName('user', userId);
  const recentActivity = await prisma.trendRecordHistory.findMany({
    where: {
      actionerId: userId,
      trendMode: {
        in: ['like',
          'follow',
          'mint',
          'create',
          'onsale',
          'salecancel',
          'saleexpire',
          'transfer']
      }
    },
    select: {
      identifier: true,
      trendMode: true,
      trendType: true,
      timestamp: true,
      actionerId: true,
      tsh_id: true,
    },
    take: -6
  });
  const actvitiesFormatted = [];
  for (activity of recentActivity) {
    const subjectName = await getIdentiferName(activity.trendType, activity.identifier);
    switch (activity.trendMode) {
      case 'like':
        message = `${actionerName} liked ${subjectName}`;
        break;
      case 'mint':
        message = `${actionerName} minted ${subjectName}`;
        break;
      case 'create':
        if (activity.trendType === 'token')
          message = `${actionerName} created collection: ${subjectName}`;
        else if (activity.trendType === 'nft') {
          activity.trendMode = 'mint'
          message = `${actionerName} minted ${subjectName}`;
        }
        break;
      case 'follow':
        message = `${actionerName} started following ${subjectName}`;
        break;
      case 'transfer':
        message = `${actionerName} transferred NFT: ${subjectName}`;
        break;
      case 'onsale':
        activity.trendMode = 'On sale'
        message = `${subjectName} was put on sale`;
        break;
      case 'salecancel':
        activity.trendMode = 'Sale cancelled'
        message = `${subjectName} sale was cancelled`;
        break;
      case 'saleexpire':
        activity.trendMode = 'Sale expired'
        message = `${subjectName} sale was expired`;
        break;
      default:
        break;
    }
    actvitiesFormatted.push({
      description: message,
      type: activity.trendMode,
      timestamp: activity.timestamp,
      tsh_id: activity.tsh_id,
    });
  }
  res.send(actvitiesFormatted);
});

const getUserActionItems = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const recentActivity = [
    ...await getOnSaleActionItems(userId),
    ...await getAuctionBidActionItems(userId),
    ...await getOfferPlacingActionItems(userId),
  ];
  recentActivity.sort((a, b) => b.timestamp - a.timestamp);
  res.send(recentActivity);
});

const getUserStatistics = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const nftCount = {
    "whereClause": {
      user_id: userId, OR: [
        {
          status: null,
        },
        { status: { in: ['Paused'] } },
      ],
    }, "groupByColumn": 'user_id'
  };
  const saleAmount = { "whereClause": { sellerId: userId, status: "COMPLETED" }, "groupByColumn": 'sellerId' };
  const userStatistics = [
    await getAllCollectionsCreated(nftCount),
    await getAllHbrCreated(saleAmount),
    await getNftOwned(nftCount),
    await getNftCreated(nftCount),
  ];
  const result = userStatistics.filter(x => x);
  res.send(result);
});

const addUserDetails = catchAsync(async (req, res) => {
  const { userName: user_name, userId, images, subscriptionType, verified, walletAddress, operation, email,
    targetAudience,
    ftAudience,
    ftAudienceOthers,
    website,
    teamSize,
    source,
    sourceOthers } = req.body;
  let response;
  if (operation === 'add') {
    const socialMedia = req.body?.socialMedia?.map(item => { return { ...item, user_id: userId } }) || [];
    response = await prisma.user.create({
      data: {
        user_name: user_name,
        email,
        user_role: '1',
        subscriptionType,
        verified,
        Wallet: {
          create: {
            wallet_address: walletAddress,
            wallet_client: 'hashpack'
          },
        },
        SocialMedia: {
          create: socialMedia,
        },
        image: {
          create: images,
        },
      },
      include: {
        Wallet: true,
        image: true,
      }
    });
    // Send mail to dgverse team
    const email_params = {
      template_form: 'User registration',
      template_targetAudience: targetAudience,
      template_ftAudience: ftAudience,
      template_ftAudienceOthers: ftAudienceOthers,
      template_website: website,
      template_teamSize: teamSize,
      template_source: source,
      template_sourceOthers: sourceOthers,
      template_socialMedia: socialMedia ? JSON.stringify(socialMedia): ''
    }
    const emailContent = await renderEmailTemplate('user-details', email_params);

    const mailOptions = {
      from: 'dgverse.future@gmail.com',
      to: 'hello@dgverse.in',
      cc: ['jazeer@dgverse.in', 'arun.menon@dgverse.in', 'harish.haridas@dgverse.in'],
      subject: 'dgVerse user enquiry',
      html: emailContent
    };
    const errorJson = { emailContent };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    /* Mail end */
  } else {
    response = await prisma.user.update({
      where: {
        user_id: userId
      },
      data: {
        subscriptionType,
      },
      include: {
        Wallet: true,
        image: true,
      }
    });
  }

  if (response) {
    const user = response;
    const userDetails = {
      user_id: user.user_id,
      user_name: user.user_name,
      user_role: user.user_role,
      subscriptionType: user.subscriptionType,
      verified: user.verified,
      wallet_address: user.Wallet[0].wallet_address,
      image_icon: `${user.user_id}.jpeg`
    }
    const accessToken = generateAccessToken(userDetails);
    if (operation === 'add') {
      const refreshToken = generateRefreshToken(userDetails);
      await prisma.refreshToken.create({
        data: {
          userId: user.user_id,
          refToken: refreshToken
        }
      });
      addTrendHistory('user', 'create', user.user_id.toString(), user.user_id);
      res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });
    }
    res.status(httpStatus.OK).send({
      user: userDetails,
      accessToken,
    });
  }
});


const addToNewletterlist = catchAsync(async (req, res) => {
  const { email } = req.body;
  const upsertEmail = await prisma.newsletterlist.upsert({
    where: {
      email,
    },
    update: {},
    create: {
      email
    },
  })
  res.status(httpStatus.OK).end();
});


const getNotifications = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { groupByDate } = req.query;
  const result = await prisma.notifications.findMany({
    where: {
      user_id: userId,
      readFlag: false,
      // timestamp: getConditionXDaysBefore(14),
    },
    select: {
      ntfcn_id: true,
      type: true,
      identifier: true,
      message: true,
      user_id: true,
      timestamp: true,
    },
    orderBy: {
      timestamp: "desc"
    }
  });
  let redirectionLink;
  const resultWithLink = result.map((x, index) => {
    switch (x.type) {
      case 'nft':
        redirectionLink = `/nft/${x.identifier}/home`;
        break;
      case 'token':
        redirectionLink = `/collection/${x.identifier}/home`;

        break;
      case 'user':
        redirectionLink = `/user/${x.identifier}/profile`;
        break;
      default:
        break;
    }
    return {
      ...x, redirectionLink, key: `${x.identifier}-${index}`
    }
  })
  if (groupByDate) {
    let groupedResult = [];
    let prevDate = null;
    for (noyftn of resultWithLink) {
      const date = moment(noyftn.timestamp).format('MMM Do, YYYY');
      // if (groupedResult[])
      if (date !== prevDate) {
        prevDate = date;
        key = noyftn.key;
        groupedResult.push({
          date,
          key,
          messages: [
            noyftn
          ]
        });
      } else {
        groupedResult[groupedResult.length - 1].messages.push(noyftn);
      }
    }
    res.status(httpStatus.OK).send(groupedResult);
  } else res.status(httpStatus.OK).send(resultWithLink);
});

const updateReadFlagNotifications = catchAsync(async (req, res) => {
  const { ntfcnId } = req.params;
  await prisma.notifications.update({
    where: { ntfcn_id: ntfcnId },
    data: { readFlag: true },
  });
  res.status(httpStatus.OK).end();
});

const checkTokenAsset = catchAsync(async (req, res) => {
  const { tokenId, userId } = req.params;
  const user = await prisma.NFT.findMany({
    where: {
      token_id: tokenId,
      user_id: userId * 1
    },
    select: {
      nft_name: true,
    },
  });
  if (user.length > 0) {
    res.status(httpStatus.OK).send({ status: true });
  } else {
    res.status(httpStatus.OK).send({ status: false });
  }
});

module.exports = {
  getUserById,
  getAssetsOwned,
  getRecentActivity,
  getUserActionItems,
  getUserStatistics,
  addUserDetails,
  addToNewletterlist,
  getNotifications,
  updateReadFlagNotifications,
  checkTokenAsset,
};
