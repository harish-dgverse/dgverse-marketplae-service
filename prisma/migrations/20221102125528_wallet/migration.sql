/*
  Warnings:

  - You are about to drop the column `wallet_address` on the `nft` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `nft` DROP FOREIGN KEY `nft_wallet_address_fkey`;

-- AlterTable
ALTER TABLE `nft` DROP COLUMN `wallet_address`;
