/*
  Warnings:

  - You are about to drop the column `image_id` on the `token` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token_id]` on the table `image` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `token` DROP FOREIGN KEY `token-image-fk`;

-- AlterTable
ALTER TABLE `image` ADD COLUMN `token_id` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `token` DROP COLUMN `image_id`;

-- CreateIndex
CREATE UNIQUE INDEX `image_token_id_key` ON `image`(`token_id`);

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `token-image-fk` FOREIGN KEY (`token_id`) REFERENCES `token`(`token_id`) ON DELETE CASCADE ON UPDATE CASCADE;
