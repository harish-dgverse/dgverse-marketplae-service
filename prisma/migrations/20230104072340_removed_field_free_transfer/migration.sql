/*
  Warnings:

  - You are about to drop the column `freeTransfer` on the `sale` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `sale` DROP COLUMN `freeTransfer`,
    MODIFY `saleMode` ENUM('DIRECT_SALE', 'DIRECT_SALE_WITH_COUNTER', 'FREE_TRANSFER', 'TIMED_AUCTION', 'DUTCH_AUCTION') NOT NULL;
