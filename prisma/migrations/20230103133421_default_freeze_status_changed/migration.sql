/*
  Warnings:

  - You are about to alter the column `default_freeze_status` on the `token` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `token` MODIFY `default_freeze_status` BOOLEAN NULL DEFAULT false;
