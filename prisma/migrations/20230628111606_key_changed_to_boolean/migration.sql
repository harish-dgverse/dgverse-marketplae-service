/*
  Warnings:

  - You are about to alter the column `kyc_key` on the `token` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `TinyInt`.
  - You are about to alter the column `admin_key` on the `token` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `TinyInt`.
  - You are about to alter the column `supply_key` on the `token` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `TinyInt`.
  - You are about to alter the column `wipe_key` on the `token` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `TinyInt`.
  - You are about to alter the column `private_key` on the `token` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `TinyInt`.
  - You are about to alter the column `freeze_key` on the `token` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `TinyInt`.
  - You are about to alter the column `pause_key` on the `token` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `TinyInt`.
  - You are about to alter the column `fee_schedule_key` on the `token` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `token` ADD COLUMN `max_supply` INTEGER NULL,
    MODIFY `kyc_key` BOOLEAN NULL DEFAULT false,
    MODIFY `admin_key` BOOLEAN NULL DEFAULT false,
    MODIFY `supply_key` BOOLEAN NULL DEFAULT false,
    MODIFY `wipe_key` BOOLEAN NULL DEFAULT false,
    MODIFY `private_key` BOOLEAN NULL DEFAULT false,
    MODIFY `freeze_key` BOOLEAN NULL DEFAULT false,
    MODIFY `pause_key` BOOLEAN NULL DEFAULT false,
    MODIFY `fee_schedule_key` BOOLEAN NULL DEFAULT false;
