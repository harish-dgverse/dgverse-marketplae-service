const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { getTokenById } = require('../../../../utils/tokenUtil');
const { getNFTById } = require('../../../../utils/nftUtil');
const { tokenRegex } = require('../../../../constants/regexPatterns');

const getTrendingList = async ({ filterToken, filterNFT, filterByToken, filterByUser, includeSbt, excludeNft }) => {
    let whereCondition = {};
    if (filterByToken) whereCondition = { unique_id: { startsWith: filterByToken } };
    const trend = await prisma.Trend.findMany({
        where: whereCondition,
        select: {
            unique_id: true, rank: true, type: true
        }
    });
    const response = {
        token: [],
        nft: [],
        nftc: [],
        ft: [],
        nftOnSale: [],
        ftOnSale: [],
    };
    console.log(trend);
    for (element of trend) {
        const isToken = tokenRegex.test(element.unique_id);
        if (isToken && filterToken) {
            const details = await getTokenById(element.unique_id);
            if (!details) continue;
            if (details.token_type === 'sbt' && !includeSbt) continue;
            if (filterByUser && (details.token_type === 'sbt' || details.token_type === 'nft') && details?.user?.user_id !== filterByUser) continue;
            if (details.token_type === 'nft') response.nftc.push(details);
            if (details.token_type === 'ft') {
                const socialTokenDetails = details.SocialToken;
                const onSale = socialTokenDetails.some(item => item.saleDetails);
                const userFound = socialTokenDetails.some(item => item.ownedBy === filterByUser);
                if (onSale) response.ftOnSale.push(details);
                response.ft.push(details);
                // Filterbyuser
                if (!userFound && filterByUser) continue;
            }
            response.token.push(details);
        } else if (!isToken && filterNFT) {
            const details = await getNFTById(element.unique_id);
            if (!details) continue;
            if (details.nft_type === 'nft' && excludeNft === element.unique_id) continue;
            if (details.nft_type === 'sbt' && !includeSbt) continue;
            if (filterByUser && details?.user?.user_id !== filterByUser) continue;
            if (details.saleDetails) response.nftOnSale.push(details);
            response.nft.push(details);
        }
    }
    return response;
}

module.exports = {
    getTrendingList
};
