/*
  Warnings:

  - A unique constraint covering the columns `[wallet_address]` on the table `user-relation-to-token` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `wallet_address` to the `user-relation-to-token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user-relation-to-token` ADD COLUMN `wallet_address` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user-relation-to-token_wallet_address_key` ON `user-relation-to-token`(`wallet_address`);
