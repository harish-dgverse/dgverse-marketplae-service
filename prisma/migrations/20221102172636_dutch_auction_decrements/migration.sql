/*
  Warnings:

  - You are about to drop the column `currentBid` on the `auction` table. All the data in the column will be lost.
  - You are about to drop the column `currentBidderId` on the `auction` table. All the data in the column will be lost.
  - You are about to drop the column `currentPrice` on the `dutch_auction_decrements` table. All the data in the column will be lost.
  - Added the required column `decrementalDate` to the `dutch_auction_decrements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `decrementedPrice` to the `dutch_auction_decrements` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `auction` DROP FOREIGN KEY `currentBidderId-Sale-user-fk`;

-- AlterTable
ALTER TABLE `auction` DROP COLUMN `currentBid`,
    DROP COLUMN `currentBidderId`;

-- AlterTable
ALTER TABLE `dutch_auction_decrements` DROP COLUMN `currentPrice`,
    ADD COLUMN `decrementalDate` DATETIME(3) NOT NULL,
    ADD COLUMN `decrementedPrice` INTEGER NOT NULL;
