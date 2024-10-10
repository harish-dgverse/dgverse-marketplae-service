/*
  Warnings:

  - You are about to drop the column `token_id` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `image` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[image_id]` on the table `token` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[image_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `token-image-fk`;

-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `user-image-fk`;

-- AlterTable
ALTER TABLE `image` DROP COLUMN `token_id`,
    DROP COLUMN `user_id`;

-- AlterTable
ALTER TABLE `token` ADD COLUMN `image_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `image_id` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `token_image_id_key` ON `token`(`image_id`);

-- CreateIndex
CREATE UNIQUE INDEX `user_image_id_key` ON `user`(`image_id`);

-- AddForeignKey
ALTER TABLE `token` ADD CONSTRAINT `token-image-fk` FOREIGN KEY (`image_id`) REFERENCES `image`(`image_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user-image-fk` FOREIGN KEY (`image_id`) REFERENCES `image`(`image_id`) ON DELETE CASCADE ON UPDATE CASCADE;
