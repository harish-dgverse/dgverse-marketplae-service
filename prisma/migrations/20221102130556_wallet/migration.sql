/*
  Warnings:

  - Added the required column `wallet_address` to the `nft` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `nft` ADD COLUMN `wallet_address` VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE `nft` ADD CONSTRAINT `nft_wallet_address_fkey` FOREIGN KEY (`wallet_address`) REFERENCES `wallet`(`wallet_address`) ON DELETE CASCADE ON UPDATE CASCADE;
