/*
  Warnings:

  - You are about to drop the column `image_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `user-image-fk`;

-- DropIndex
DROP INDEX `user_image_id_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `image_id`;

-- DropTable
DROP TABLE `Post`;

-- DropTable
DROP TABLE `Users`;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `user-image-fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
