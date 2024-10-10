/*
  Warnings:

  - You are about to drop the `Auction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Auction` DROP FOREIGN KEY `Auction-Sale-fk`;

-- DropForeignKey
ALTER TABLE `auction_bids` DROP FOREIGN KEY `AuctionBids-Auction-fk`;

-- AlterTable
ALTER TABLE `direct_sale_counter_offers` MODIFY `offeredByUserId` INTEGER NULL;

-- AlterTable
ALTER TABLE `sale` MODIFY `quotedPrice` INTEGER NULL;

-- DropTable
DROP TABLE `Auction`;

-- CreateTable
CREATE TABLE `auction` (
    `auctionId` INTEGER NOT NULL AUTO_INCREMENT,
    `currentBid` INTEGER NULL,
    `currentBidderId` INTEGER NULL,
    `auctionReservePrice` INTEGER NULL,
    `auctionBasePrice` INTEGER NOT NULL,
    `incrementalMinBid` INTEGER NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `saleId` INTEGER NOT NULL,

    UNIQUE INDEX `auction_saleId_key`(`saleId`),
    PRIMARY KEY (`auctionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sale` ADD CONSTRAINT `token-Sale-fk` FOREIGN KEY (`tokenId`) REFERENCES `token`(`token_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sale` ADD CONSTRAINT `nft-Sale-fk` FOREIGN KEY (`nftId`) REFERENCES `nft`(`nft_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sale` ADD CONSTRAINT `sale_buyerId_fkey` FOREIGN KEY (`buyerId`) REFERENCES `user`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sale` ADD CONSTRAINT `sale_sellerId_fkey` FOREIGN KEY (`sellerId`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auction` ADD CONSTRAINT `currentBidderId-Sale-user-fk` FOREIGN KEY (`currentBidderId`) REFERENCES `user`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auction` ADD CONSTRAINT `Auction-Sale-fk` FOREIGN KEY (`saleId`) REFERENCES `sale`(`saleId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auction_bids` ADD CONSTRAINT `bidderWalletId-Sale-user-fk` FOREIGN KEY (`bidderWalletId`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auction_bids` ADD CONSTRAINT `AuctionBids-Auction-fk` FOREIGN KEY (`auctionId`) REFERENCES `auction`(`auctionId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `direct_sale_counter_offers` ADD CONSTRAINT `offeredByUserId-Sale-user-fk` FOREIGN KEY (`offeredByUserId`) REFERENCES `user`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;
