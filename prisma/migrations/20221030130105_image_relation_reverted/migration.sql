/*
  Warnings:

  - You are about to drop the column `image_id` on the `nft` table. All the data in the column will be lost.
  - You are about to drop the column `image_id` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nft_id]` on the table `image` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `nft` DROP FOREIGN KEY `nft_image_id_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user-image-fk`;

-- AlterTable
ALTER TABLE `image` ADD COLUMN `nft_id` VARCHAR(255) NULL,
    ADD COLUMN `user_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `nft` DROP COLUMN `image_id`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `image_id`;

-- CreateIndex
CREATE UNIQUE INDEX `image_user_id_key` ON `image`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `image_nft_id_key` ON `image`(`nft_id`);

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `image_nft_id_fkey` FOREIGN KEY (`nft_id`) REFERENCES `nft`(`nft_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `image_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
