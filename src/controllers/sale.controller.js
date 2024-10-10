const httpStatus = require('http-status');
const { PrismaClient } = require('@prisma/client');
const catchAsync = require('../utils/catchAsync');
const prisma = new PrismaClient();
const { getSaleDetailsUsingSaleId, transferNFTUtil, convertDecrementValuetoDays } = require('./utils/saleUtils');
const { addTrendHistory } = require('../utils/trendUtil');

const getSaleDetails = catchAsync(async (req, res) => {
    const { nftId } = req.params;
    const saleRx = await prisma.sale.findFirst({
        where: {
            nftId,
            status: "ON_GOING"
        },
        select: {
            // tokenId: true,
            nftId: true,
            saleMode: true,
            quotedPrice: true,
            expiresAt: true,
        }
    });
    if (!saleRx) {
        return res.status(httpStatus.BAD_REQUEST).send({ message: 'No results' });
    }
    res.send(saleRx);
});

const sendToMarketplace = catchAsync(async (req, res) => {
    const { identifier, tokenType, quotedPrice, sellerId, expiresAt, volume } = req.body;
    if (tokenType === 'nft') {
        await prisma.Sale.create({
            data: {
                nftId: identifier,
                tokenType: 'nft',
                saleMode: 'DIRECT_SALE',
                quotedPrice,
                sellerId,
                expiresAt,
                status: 'ON_GOING',
            },
        });
        addTrendHistory('nft', 'onsale', identifier, sellerId, sellerId);
    } else if(tokenType === 'ft') {
        await prisma.Sale.create({
            data: {
                tokenId: identifier,
                tokenType: 'ft',
                saleMode: 'DIRECT_SALE',
                quotedPrice,
                volume,
                orginalVolume: volume,
                sellerId,
                expiresAt,
                status: 'ON_GOING',
            },
        });
        addTrendHistory('token', 'onsale', identifier, sellerId, sellerId);
    }
    res.status(httpStatus.OK).end();
});

const changeStatusOfSale = catchAsync(async (req, res) => {
    const { saleId } = req.body;
    const { NFT, sellerId, token, tokenType } = await getSaleDetailsUsingSaleId({ saleId })
    const update = await prisma.sale.update({
        where: {
            saleId
        },
        data: {
            status: 'CANCELLED',
            updatedAt: new Date(),
        },
    });
    if (tokenType === 'ft') {
        addTrendHistory('token', 'salecancel', token.token_id, sellerId, sellerId);
    } else addTrendHistory('nft', 'salecancel', NFT.nft_id, sellerId, sellerId);
    res.status(httpStatus.OK).end();
});

const saleExpired = catchAsync(async (req, res) => {
    const { saleId } = req.body;
    const { NFT, sellerId, token, tokenType } = await getSaleDetailsUsingSaleId({ saleId })
    await prisma.sale.update({
        where: {
            saleId
        },
        data: {
            status: "EXPIRED",
            updatedAt: new Date(),
        },
    });
    if (tokenType === 'ft') {
        addTrendHistory('token', 'saleexpire', token.token_id, sellerId, sellerId);
    } else addTrendHistory('nft', 'saleexpire', NFT.nft_id, sellerId, sellerId);
    res.status(httpStatus.OK).end();
});

module.exports = {
    getSaleDetails,
    sendToMarketplace,
    changeStatusOfSale,
    saleExpired,
};
