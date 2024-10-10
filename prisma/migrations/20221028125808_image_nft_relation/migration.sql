/*
  Warnings:

  - You are about to drop the column `nft_id` on the `image` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[image_id]` on the table `nft` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `nft-image-fk`;

-- AlterTable
ALTER TABLE `image` DROP COLUMN `nft_id`;

-- AlterTable
ALTER TABLE `nft` ADD COLUMN `image_id` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `nft_image_id_key` ON `nft`(`image_id`);

-- AddForeignKey
ALTER TABLE `nft` ADD CONSTRAINT `nft_image_id_fkey` FOREIGN KEY (`image_id`) REFERENCES `image`(`image_id`) ON DELETE SET NULL ON UPDATE CASCADE;
