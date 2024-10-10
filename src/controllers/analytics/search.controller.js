const httpStatus = require('http-status');
const { searchTokenMatch, searchTokenById } = require('../../utils/tokenUtil');
const { searchNFTMatch, searchNFTById } = require('../../utils/nftUtil');
const { searchUserMatch, getUserByWalletId } = require('../../utils/userUtil');
const { tokenOrNftRegex } = require('../../constants/regexPatterns');
const catchAsync = require('../../utils/catchAsync');

// function searchById(searchId) {
//   return new Promise((resolve, reject) => {
//     if (tokenOrNftRegex.test(searchId)) {
//       Promise.all([
//         searchTokenById(searchId),
//         searchNFTById(searchId),
//         getUserByWalletId(searchId),
//       ]).then((response) => {
//         let merged = [];
//         response = response.filter(value => value)
//         if (response) {
//           merged = [].concat.apply([], [response]);
//           merged.forEach(element => element.rank = 0);
//         }
//         resolve(merged);
//       });
//     } else {
//       resolve([]);
//     }
//   })
// }

// function partialSearchStartsWith(searchId) {
//   return new Promise((resolve, reject) => {
//     if (tokenOrNftRegex.test(searchId)) {
//       Promise.all([
//         searchTokenByPartialMatch({
//           token_id: {
//             startsWith: searchId
//           }
//         }),
//       ]).then((response) => {
//         console.log('partialSearchStartsWith');
//         console.log(response);
//         let merged = [];
//         response = response.filter(value => value)
//         if (response) {
//           merged = [].concat.apply([], response);
//           merged.forEach(element => element.rank = 1);
//           resolve(merged);
//         } else resolve([])
//         console.log('partialSearchStartsWith');
//         console.log(merged);
//       });
//     } else {
//       resolve([])
//     }
//   })
// }

function partialSearch(searchText) {
  // Include wallet id
  // Ranking
  // 1 - Exact Match NFT
  // 2 - Exact Match Collection
  // 3 - Exact Match User
  // 4 - Starts with NFT
  // 5 - Starts with Collection
  // 6 - Starts with User
  // 7 - contains with NFT
  // 8 - contains with Collection
  // 9 - contains with User
  return new Promise((resolve, reject) => {
    Promise.all([
      searchTokenMatch(searchText),
      searchNFTMatch(searchText),
      searchUserMatch(searchText),
    ]).then((response) => {
      let merged = [];
      response = response.filter(value => value)
      if (response) {
        merged = [].concat.apply([], response);
        merged.forEach(element => {
          if (element.type === 'Account') {
            if (element.user_name === searchText || element.wallet_address === searchText) element.rank = 3;
            else if (element.user_name.startsWith(searchText) || element.wallet_address.startsWith(searchText)) element.rank = 6;
            else element.rank = 9;
          }
          if (element.type === 'NFT') {
            if (element.nft_name === searchText || element.nft_id === searchText) element.rank = 1;
            else if (element.nft_name.startsWith(searchText) || element.nft_id.startsWith(searchText)) element.rank = 4;
            else element.rank = 7;
          }
          if (element.type === 'Collection') {
            if (element.name === searchText || element.token_id === searchText) element.rank = 2;
            else if (element.name.startsWith(searchText) || element.token_id.startsWith(searchText)) element.rank = 5;
            else element.rank = 8;
          }
        });
        merged.sort((a, b) => a.rank - b.rank);
        resolve(merged);
      } else resolve([])
      console.log('partialSearch');
      console.log(merged);
    });
  })
}

function generalSearch(searchText) {
  return new Promise(function (resolve, reject) {
    Promise.all([
      // searchById(searchText), // all other search functions goes here
      partialSearch(searchText),
    ]).then((response) => {
      console.log('generalSearch');
      console.log(response);
      let merged = []

      if (response) {
        merged = [].concat.apply([], response);
      }
      console.log('generalSearch 2');
      console.log(response);
      resolve(merged.slice(0, 10));

    });
  })
}

function handleResponse(res, result) {
  console.log('handleResponse');
  console.log(result);
  if (result !== [] && result.length === 1 && result?.[0] !== null)  {
    result = result
      // .filter(item =>
      //   !item?.status || (item?.status !== 'Deleted' || item?.status !== 'Burned' || item?.status !== 'Wiped')
      // )
      .map(item => {
        let hash;
        const key = item.wallet_address || item.nft_id || item.token_id;
        switch (item.type) {
          case 'NFT':
            hash = `/nft/${key}/home`;
            break;
          case 'Collection':
            hash = `/collection/${key}/home`;
            break;
          case 'Account':
            hash = `/user/${item.user_id}/profile`;
            break;
          default:
            break;
        }
        return {
          ...item,
          name: item.name || item.nft_name || item.user_name,
          key,
          hash,
        }
      })
    console.log('resp');
    console.log(result);
    res.status(httpStatus.OK).send(result);
  } else {
    res.status(httpStatus.OK).send([]);

  }
}

const searchData = catchAsync(async (req, res) => {
  const { q: searchText, filterFlag } = req.query;
  if (!filterFlag) {
    // here goes general search
    generalSearch(searchText).then(result => handleResponse(res, result));

  } else if (filterFlag === 'token') {
    searchTokenById(searchText).then(result => handleResponse(res, [result]));

  } else if (filterFlag === 'nft') {
    searchNFTById(searchText).then(result => handleResponse(res, [result]));

  } else if (filterFlag === 'user') {
    getUserByWalletId(searchText).then(result => handleResponse(res, [result]));
  }
});

module.exports = {
  searchData
};
