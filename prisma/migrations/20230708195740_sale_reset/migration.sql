/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `sale` table. All the data in the column will be lost.
  - You are about to drop the column `quotedPrice` on the `sale` table. All the data in the column will be lost.
  - You are about to drop the column `saleDoneAt` on the `sale` table. All the data in the column will be lost.
  - You are about to drop the column `salePrice` on the `sale` table. All the data in the column will be lost.
  - You are about to drop the `auction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `auction_bids` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `direct_sale` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `direct_sale_counter_offers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dutch_auction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dutch_auction_decrements` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `auction` DROP FOREIGN KEY `Auction-Sale-fk`;

-- DropForeignKey
ALTER TABLE `auction_bids` DROP FOREIGN KEY `AuctionBids-Auction-fk`;

-- DropForeignKey
ALTER TABLE `auction_bids` DROP FOREIGN KEY `bidderWalletId-Sale-user-fk`;

-- DropForeignKey
ALTER TABLE `direct_sale` DROP FOREIGN KEY `directSale-Sale-fk`;

-- DropForeignKey
ALTER TABLE `direct_sale_counter_offers` DROP FOREIGN KEY `directSaleCounterOffers-directSale-fk`;

-- DropForeignKey
ALTER TABLE `direct_sale_counter_offers` DROP FOREIGN KEY `offeredByUserId-Sale-user-fk`;

-- DropForeignKey
ALTER TABLE `dutch_auction` DROP FOREIGN KEY `dutchAuction-Sale-fk`;

-- DropForeignKey
ALTER TABLE `dutch_auction_decrements` DROP FOREIGN KEY `dutchAuctionDecrements-dutchAuctionDecrements-fk`;

-- AlterTable
ALTER TABLE `sale` DROP COLUMN `expiresAt`,
    DROP COLUMN `quotedPrice`,
    DROP COLUMN `saleDoneAt`,
    DROP COLUMN `salePrice`;

-- AlterTable
ALTER TABLE `trend_record_history` ADD COLUMN `actionerId` INTEGER NULL;

-- DropTable
DROP TABLE `auction`;

-- DropTable
DROP TABLE `auction_bids`;

-- DropTable
DROP TABLE `direct_sale`;

-- DropTable
DROP TABLE `direct_sale_counter_offers`;

-- DropTable
DROP TABLE `dutch_auction`;

-- DropTable
DROP TABLE `dutch_auction_decrements`;
