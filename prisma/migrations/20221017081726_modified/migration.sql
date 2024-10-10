/*
  Warnings:

  - You are about to drop the column `auctionBidId` on the `Auction` table. All the data in the column will be lost.
  - You are about to drop the column `dutchAuctionDecrementId` on the `dutch_auction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Auction` DROP COLUMN `auctionBidId`,
    MODIFY `currentBid` INTEGER NULL,
    MODIFY `currentBidderId` INTEGER NULL,
    MODIFY `auctionReservePrice` INTEGER NULL,
    MODIFY `incrementalMinBid` INTEGER NULL;

-- AlterTable
ALTER TABLE `dutch_auction` DROP COLUMN `dutchAuctionDecrementId`;

-- AlterTable
ALTER TABLE `sale` MODIFY `salePrice` INTEGER NULL,
    MODIFY `buyerId` INTEGER NULL,
    MODIFY `expiresAt` DATETIME(3) NULL,
    MODIFY `saleDoneAt` DATETIME(3) NULL;
