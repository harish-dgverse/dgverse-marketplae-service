/*
  Warnings:

  - The primary key for the `user-relation-to-token` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `user_rel_id` to the `user-relation-to-token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user-relation-to-token` DROP PRIMARY KEY,
    ADD COLUMN `user_rel_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`user_rel_id`);
