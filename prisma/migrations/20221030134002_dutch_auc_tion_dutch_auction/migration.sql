/*
  Warnings:

  - The values [DUTCH_AUCTion] on the enum `sale_saleMode` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `sale` MODIFY `saleMode` ENUM('DIRECT_SALE', 'DIRECT_SALE_WITH_COUNTER', 'TIMED_AUCTION', 'DUTCH_AUCTION') NOT NULL;
