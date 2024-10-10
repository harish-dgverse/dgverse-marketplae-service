/*
  Warnings:

  - You are about to drop the column `nft_type` on the `nft` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `nft` DROP COLUMN `nft_type`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `subscriptionType` VARCHAR(255) NOT NULL DEFAULT 'basic',
    ADD COLUMN `verified` BOOLEAN NOT NULL DEFAULT false;
