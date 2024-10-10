/*
  Warnings:

  - A unique constraint covering the columns `[nft_id]` on the table `image` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `image` ADD COLUMN `nft_id` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `nft` ADD COLUMN `metadata` VARCHAR(255) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `image_nft_id_key` ON `image`(`nft_id`);

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `nft-image-fk` FOREIGN KEY (`nft_id`) REFERENCES `nft`(`nft_id`) ON DELETE SET NULL ON UPDATE CASCADE;
