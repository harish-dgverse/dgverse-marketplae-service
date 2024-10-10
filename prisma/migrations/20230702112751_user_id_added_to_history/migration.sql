/*
  Warnings:

  - Added the required column `userId` to the `trend_record_history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `trend_record_history` ADD COLUMN `userId` INTEGER NOT NULL;
