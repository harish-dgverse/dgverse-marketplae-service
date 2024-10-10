/*
  Warnings:

  - You are about to alter the column `decimal` on the `token` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.

*/
-- AlterTable
ALTER TABLE `token` MODIFY `decimal` INTEGER NULL;
