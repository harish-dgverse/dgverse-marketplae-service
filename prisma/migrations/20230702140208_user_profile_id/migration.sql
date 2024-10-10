/*
  Warnings:

  - Added the required column `userProfileId` to the `user_view` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_view` ADD COLUMN `userProfileId` INTEGER NOT NULL;
