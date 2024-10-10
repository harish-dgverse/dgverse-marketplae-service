/*
  Warnings:

  - The primary key for the `user_like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user_like` table. All the data in the column will be lost.
  - The primary key for the `user_share` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user_share` table. All the data in the column will be lost.
  - Added the required column `like_id` to the `user_like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `share_id` to the `user_share` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_like` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `like_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`like_id`);

-- AlterTable
ALTER TABLE `user_share` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `share_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`share_id`);
