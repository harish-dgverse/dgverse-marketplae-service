/*
  Warnings:

  - You are about to alter the column `initial_supply` on the `token` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `token` MODIFY `initial_supply` DOUBLE NULL;
