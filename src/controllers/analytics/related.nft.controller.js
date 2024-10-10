const catchAsync = require('../../utils/catchAsync');
const { getTrendingList } = require('./trend/utils/getTrendUtil');
const { getTags, getNftWithRelatedTags, splitNftId } = require('../../utils/nftUtil');
const httpStatus = require('http-status');

const getRelatedNfts = catchAsync(async (req, res) => {
  const { nftId } = req.params;
  // get tags
  const { tokenId } = splitNftId(nftId);
  const nftDetails = await getTags(nftId);
  // if tags are missing, then get those token nft and 
  let tokenChildNfts, userNfts, response = [], relatedNfts = [];
  tokenChildNfts = await getTrendingList({ filterNFT: true, filterByToken: tokenId });
  if (tokenChildNfts.nft?.length < 10) {
    // then user nfts from trending list
    userNfts = await getTrendingList({ filterNFT: true, filterByUser: nftDetails.user_id });
  }
  if (nftDetails && nftDetails?.tags.length !== 0) {
    // if tags, get nfts where some tags matching tags given
    relatedNfts = await getNftWithRelatedTags(nftDetails?.tags, nftId);
  }
  response = [...relatedNfts, ...tokenChildNfts.nft, ...userNfts.nft]
  // remove duplicates
  const uniqueIds = [nftId];
  response = response.filter(element => {
    const isDuplicate = uniqueIds.includes(element.nft_id);
    if (!isDuplicate) {
      uniqueIds.push(element.nft_id);
      return true;
    }
    return false;
  });
  // take top 10
  res.send(response.slice(0, 10));
});

module.exports = {
  getRelatedNfts
}