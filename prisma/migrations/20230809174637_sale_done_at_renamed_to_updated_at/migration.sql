/*
  Warnings:

  - You are about to drop the column `saleDoneAt` on the `sale` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `sale` DROP COLUMN `saleDoneAt`,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;
