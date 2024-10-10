/*
  Warnings:

  - You are about to alter the column `total_supply` on the `token` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.

*/
-- AlterTable
ALTER TABLE `token` MODIFY `total_supply` INTEGER NULL;
