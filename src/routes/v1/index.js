const express = require('express');
const config = require('../../config/config');
const docsRoute = require('./docs.route');
const tokenRoute = require('./token.route');
const userRoute = require('./user.route');
const miscRoute = require('./misc.route');
const nftRoute = require('./nft.route');
const analyticsRoute = require('./analytics.route');
const followingsRoute = require('./followings.route');
const favoritesRoute = require('./favorites.route');
const likeRoute = require('./like.route');
const shareRoute = require('./share.route');
const artifactListingRoute = require('./artifactListing.route');
const authRoute = require('./auth.route');
const ipfsRoute = require('./ipfs.route');
const emailRoute = require('./email.route');
const hederaServicesRoute = require('./hederaServices.route');
const saleRoute = require('./sale.route');
const emailRoute = require('./email.route');
const router = express.Router();

const defaultRoutes = [
  {
    path: '/docs',
    route: docsRoute,
  },
  {
    path: '/token',
    route: tokenRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/misc',
    route: miscRoute,
  }, 
  {
    path: '/nft',
    route: nftRoute,
  },
  {
    path: '/sale',
    route: saleRoute,
  },
  {
    path: '/followings',
    route: followingsRoute,
  },
  {
    path: '/user/favorites',
    route: favoritesRoute,
  },
  {
    path: '/analytics',
    route: analyticsRoute
  },
  {
    path: '/like',
    route: likeRoute
  },
  {
    path: '/share',
    route: shareRoute
  },
  {
    path: '/artifact/listing/',
    route: artifactListingRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/ipfs',
    route: ipfsRoute,
  },
  {
    path: '/email',
    route: emailRoute,
  },
  {
    path: '/hts',
    route: hederaServicesRoute,
  },
  {
    path: '/email',
    route: emailRoute,
  }
];

const devRoutes = [
  // routes available only in dev mode
  // {
  //   path: "/docs",
  //   route: docsRoute,
  // },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'dev') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
