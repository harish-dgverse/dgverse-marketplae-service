/*
  Warnings:

  - You are about to alter the column `saleMode` on the `sale` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Enum("sale_saleMode")`.
  - You are about to alter the column `status` on the `sale` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Enum("sale_status")`.
  - Added the required column `user_id` to the `nft` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `nft` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `sale` MODIFY `saleMode` ENUM('DIRECT_SALE', 'DIRECT_SALE_WITH_COUNTER', 'TIMED_AUCTION', 'DUTCH_AUCTion') NOT NULL,
    MODIFY `status` ENUM('ON_GOING', 'HOLD', 'COMPLETED', 'CANCELLED', 'EXPIRED') NOT NULL DEFAULT 'ON_GOING';

-- AddForeignKey
ALTER TABLE `nft` ADD CONSTRAINT `nft_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
