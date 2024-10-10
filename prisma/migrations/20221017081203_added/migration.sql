/*
  Warnings:

  - You are about to drop the `AuctionHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `token` MODIFY `is_nft` BOOLEAN NULL DEFAULT true;

-- DropTable
DROP TABLE `AuctionHistory`;

-- CreateTable
CREATE TABLE `sale` (
    `saleId` INTEGER NOT NULL AUTO_INCREMENT,
    `tokenId` VARCHAR(255) NOT NULL,
    `nftId` VARCHAR(255) NOT NULL,
    `saleMode` VARCHAR(255) NOT NULL,
    `status` VARCHAR(255) NOT NULL DEFAULT 'ongoing',
    `quotedPrice` INTEGER NOT NULL,
    `salePrice` INTEGER NOT NULL,
    `buyerId` INTEGER NOT NULL,
    `sellerId` INTEGER NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `freeTransfer` BOOLEAN NOT NULL DEFAULT false,
    `saleDoneAt` DATETIME(3) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`saleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Auction` (
    `auctionId` INTEGER NOT NULL AUTO_INCREMENT,
    `currentBid` INTEGER NOT NULL,
    `currentBidderId` INTEGER NOT NULL,
    `auctionReservePrice` INTEGER NOT NULL,
    `auctionBasePrice` INTEGER NOT NULL,
    `incrementalMinBid` INTEGER NOT NULL,
    `auctionBidId` INTEGER NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `saleId` INTEGER NOT NULL,

    UNIQUE INDEX `Auction_saleId_key`(`saleId`),
    PRIMARY KEY (`auctionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auction_bids` (
    `auctionBidId` INTEGER NOT NULL AUTO_INCREMENT,
    `bidPrice` INTEGER NOT NULL,
    `bidderWalletId` INTEGER NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `auctionId` INTEGER NOT NULL,

    PRIMARY KEY (`auctionBidId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dutch_auction` (
    `dutchAuctionId` INTEGER NOT NULL AUTO_INCREMENT,
    `currentPrice` INTEGER NOT NULL,
    `minPrice` INTEGER NOT NULL,
    `decrementDurationUnit` VARCHAR(255) NOT NULL,
    `decrementDurationValue` INTEGER NOT NULL,
    `dutchAuctionDecrementId` INTEGER NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `saleId` INTEGER NOT NULL,

    UNIQUE INDEX `dutch_auction_saleId_key`(`saleId`),
    PRIMARY KEY (`dutchAuctionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dutch_auction_decrements` (
    `dutchAuctionDecrementId` INTEGER NOT NULL AUTO_INCREMENT,
    `currentPrice` INTEGER NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dutchAuctionId` INTEGER NOT NULL,

    PRIMARY KEY (`dutchAuctionDecrementId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `direct_sale` (
    `directSaleId` INTEGER NOT NULL AUTO_INCREMENT,
    `allowCounter` BOOLEAN NOT NULL DEFAULT false,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `saleId` INTEGER NOT NULL,

    UNIQUE INDEX `direct_sale_saleId_key`(`saleId`),
    PRIMARY KEY (`directSaleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `direct_sale_counter_offers` (
    `directSaleCounterOfferId` INTEGER NOT NULL AUTO_INCREMENT,
    `counterOffer` INTEGER NOT NULL,
    `operationType` VARCHAR(255) NOT NULL,
    `offeredByUserId` INTEGER NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `directSaleId` INTEGER NOT NULL,

    PRIMARY KEY (`directSaleCounterOfferId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Auction` ADD CONSTRAINT `Auction-Sale-fk` FOREIGN KEY (`saleId`) REFERENCES `sale`(`saleId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auction_bids` ADD CONSTRAINT `AuctionBids-Auction-fk` FOREIGN KEY (`auctionId`) REFERENCES `Auction`(`auctionId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dutch_auction` ADD CONSTRAINT `dutchAuction-Sale-fk` FOREIGN KEY (`saleId`) REFERENCES `sale`(`saleId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dutch_auction_decrements` ADD CONSTRAINT `dutchAuctionDecrements-dutchAuctionDecrements-fk` FOREIGN KEY (`dutchAuctionId`) REFERENCES `dutch_auction`(`dutchAuctionId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `direct_sale` ADD CONSTRAINT `directSale-Sale-fk` FOREIGN KEY (`saleId`) REFERENCES `sale`(`saleId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `direct_sale_counter_offers` ADD CONSTRAINT `directSaleCounterOffers-directSale-fk` FOREIGN KEY (`directSaleId`) REFERENCES `direct_sale`(`directSaleId`) ON DELETE CASCADE ON UPDATE CASCADE;
