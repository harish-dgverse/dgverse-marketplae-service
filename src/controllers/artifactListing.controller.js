const httpStatus = require('http-status');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const catchAsync = require('../utils/catchAsync');
const { getTrendingList } = require('./analytics/trend/utils/getTrendUtil');
const { getNewestNftFirst, getExpiringList, getBasedOnPrice, getNewestTokenFirst, getBasedOnTotalSupply, getBasedOnTotalSupplyOnMarket, getFavoriteItems } = require('../utils/filterUtils');

const between = (x, min, max) => {
  return x >= min && x <= max;
}
const anyOptionSelected = (filterOptions) => {
  // const keys = Object.values(filterOptions);
  // console.log(keys, 'keys')
  // return keys.some(k => {
  //   console.log(k, 'loop 1');
  //   const valueInsideLoop = Object.values(k).some(j => {
  //     console.log(j, 'loop 2');
  //     console.log(j, 'loop 2');
  //     return j;
  //   })
  //   console.log(valueInsideLoop, 'valueInsideLoop');
  //   return valueInsideLoop;
  // })
  return Object.values(filterOptions).some(k => Object.values(k).some(j => j));
}

const filterNFT = catchAsync(async (req, res) => {
  let { filterOptions, sortOrder, page, limit, filterByUser, filterByToken, favoriteOnly, excludeNft } = req.query;
  if (filterOptions && filterOptions !== '') filterOptions = JSON.parse(filterOptions);
  let favorites;
  if(filterByUser) filterByUser = parseInt(filterByUser);
  if (favoriteOnly) {
    favorites = await getFavoriteItems({ type: 'nft', user_id: filterByUser });
    filterByUser = null;
  }
  let listedData;
  if (sortOrder === 'trending') {
    const { nft } = await getTrendingList({ filterNFT: true, filterByToken, filterByUser, includeSbt: true, excludeNft });
    listedData = nft;
  } else if (sortOrder === 'newest first') {
    const { nft } = await getNewestNftFirst({ filterByToken, filterByUser });
    listedData = nft;
  } else if (sortOrder === 'ending soon') {
    const { nft } = await getExpiringList({ filterByToken, filterByUser });
    listedData = nft;
  } else if (sortOrder === 'price lth') {
    const { nft } = await getBasedOnPrice({ lth: true, filterByToken, filterByUser });
    listedData = nft;
  } else if (sortOrder === 'price htl') {
    const { nft } = await getBasedOnPrice({ lth: false, filterByToken, filterByUser });
    listedData = nft;
  }
  // If favoriteOnly is true, then filter only favorited items of user
  if (favoriteOnly) {
    if (favorites.length > 0)
      listedData = listedData.filter(x => favorites.includes(x.nft_id));
  }

  if (!filterOptions || filterOptions === '' || !anyOptionSelected(filterOptions)) {
    const totalCount = listedData.length;
    const response = {};
    response.paginatedData = listedData.slice((page - 1) * limit, page * limit)
    response.totalCount = totalCount;
    return res.status(httpStatus.OK).send(response);
  }
  const filterListNFT = [];
  const { category, saletype, tokenType } = filterOptions;
  // To add new option, refer sale clean up commit
  for (details of listedData) {
    let categoryInclusion = false, saletypeInclusion = false, tokenTypeInclusion = false;
    if (Object.values(category).some(j => j)) {
      if (category.photography && details.nft_category === 'Photography') {
        categoryInclusion = true;
      } else if (category.digi_art && details.nft_category === 'Digital Art') {
        categoryInclusion = true;
      }
    } else categoryInclusion = true;
    if (Object.values(saletype).some(j => j)) {
      if (saletype.not_on_sale && details.saleDetails === undefined) {
        saletypeInclusion = true;
      } else if (saletype.on_sale && details.saleDetails) {
        saletypeInclusion = true;
      }
    } else saletypeInclusion = true;
    if (tokenType && Object.values(tokenType).some(j => j)) {
      if (tokenType.nft && details.nft_type === 'nft') {
        tokenTypeInclusion = true;
      } else if (tokenType.sbt && details.nft_type === 'sbt') {
        tokenTypeInclusion = true;
      }
    } else tokenTypeInclusion = true;
    // console.log(saletypeInclusion, 'saletypeInclusion');
    // console.log(Object.values(priceInclusion).some(j => j), 'priceInclusion');
    if (categoryInclusion && saletypeInclusion && tokenTypeInclusion) filterListNFT.push(details)
  }
  const totalCount = filterListNFT.length;
  const response = {};
  response.paginatedData = filterListNFT.slice((page - 1) * limit, page * limit)
  response.totalCount = totalCount;
  res.status(httpStatus.OK).send(response);
});

const filterToken = catchAsync(async (req, res) => {
  let { filterOptions, sortOrder, page, limit, filterByUser, favoriteOnly } = req.query;
  if (filterOptions !== '') filterOptions = JSON.parse(filterOptions);
  let favorites;
  if(filterByUser) filterByUser = parseInt(filterByUser);
  if (favoriteOnly) {
    favorites = await getFavoriteItems({ type: 'token', user_id: filterByUser });
    filterByUser = null;
  } 
  let listedData;
  switch (sortOrder) {
    case 'trending':
      {
        const { token } = await getTrendingList({ filterToken: true, filterByUser, includeSbt: true });
        listedData = token;
      }
      break;
    case 'newest first':
      {
        const { token } = await getNewestTokenFirst({filterByUser});
        listedData = token;
      }
      break;
    case 'nft minted lth':
      {
        const { token } = await getBasedOnTotalSupply({ lth: true, filterByUser });
        listedData = token;
      }
      break;
    case 'nft minted htl':
      {
        const { token } = await getBasedOnTotalSupply({ lth: false, filterByUser });
        listedData = token;
      }
      break;
      case 'token onsale lth':
      {
        const { token } = await getBasedOnTotalSupplyOnMarket({ lth: true, filterByUser });
        listedData = token;
      }
      break;
    case 'token onsale htl':
      {
        const { token } = await getBasedOnTotalSupplyOnMarket({ lth: false, filterByUser });
        listedData = token;
      }
      break;
  }

  if (favoriteOnly) {
    if (favorites.length > 0)
      listedData = listedData.filter(x => favorites.includes(x.token_id));
  }
  if (filterOptions === '' || !anyOptionSelected(filterOptions)) {
    const totalCount = listedData.length;
    const response = {};
    response.paginatedData = listedData.slice((page - 1) * limit, page * limit)
    response.totalCount = totalCount;
    return res.status(httpStatus.OK).send(response);
  }
  const filterListToken = [];
  const { category, tokenType, saletype } = filterOptions;
  for (details of listedData) {
    let categoryInclusion = false, tokenTypeInclusion = false, saletypeInclusion = false;
    // console.log(Object.values(category).some(j => j), 'category');
    if (Object.values(category).some(j => j)) {
      if (category.photography && details.token_category === 'Photography') {
        categoryInclusion = true;
      } else if (category.digi_art && details.token_category === 'Digital Art') {
        categoryInclusion = true;
      }
    } else categoryInclusion = true;
    if (Object.values(tokenType).some(j => j)) {
      if (tokenType.nftc && details.token_type === 'nft') {
        tokenTypeInclusion = true;
      } else if (tokenType.ft && details.token_type === 'ft') {
        tokenTypeInclusion = true;
      } else if (tokenType.sbt && details.token_type === 'sbt') {
        tokenTypeInclusion = true;
      }
    } else tokenTypeInclusion = true;
    if (Object.values(saletype).some(j => j)) {
      if (saletype.not_on_sale && details.inMarketCount === 0) {
        saletypeInclusion = true;
      } else if (saletype.on_sale && details.inMarketCount > 0) {
        saletypeInclusion = true;
      }
    } else saletypeInclusion = true;
    if (categoryInclusion && tokenTypeInclusion && saletypeInclusion) filterListToken.push(details)
  }
  const totalCount = filterListToken.length;
  const response = {};
  response.paginatedData = filterListToken.slice((page - 1) * limit, page * limit)
  response.totalCount = totalCount;
  res.status(httpStatus.OK).send(response);
});

module.exports = {
  filterNFT,
  filterToken,
};
