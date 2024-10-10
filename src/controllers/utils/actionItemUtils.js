const { PrismaClient } = require('@prisma/client');
const { nftOnSaleActionFields } = require('../dbUtils/user.db');
const { getConditionXDaysBefore } = require('./timeUtils');
const prisma = new PrismaClient();

const getOnSaleActionItems = async (userId) => {
    const queryResult = await prisma.sale.findMany({
        where: {
            sellerId: userId,
            status: "ON_GOING",
        },
        select: nftOnSaleActionFields,
    });
    return queryResult.map(item => {
        const onSaleDefaultMessage = {
            message: `Put on sale for ${item.quotedPrice} hbar`,
            saleMode: 'Direct Sale',
            type: 'On Sale',
            nftId: item.NFT.nft_id,
            amount: item.quotedPrice,
            name: item.NFT.nft_name,
            timestamp: item.timestamp,
            displayPic: item.NFT.image.thumbnail,
            saleId: item.saleId,
            raw_data: item
        }
        return onSaleDefaultMessage;
    });
}

module.exports = {
    getOnSaleActionItems,
}
