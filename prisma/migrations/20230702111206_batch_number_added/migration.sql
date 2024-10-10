/*
  Warnings:

  - Added the required column `batch_number` to the `trend` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `trend` table without a default value. This is not possible if the table is not empty.
  - Added the required column `batch_number` to the `trend_registry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `trend` ADD COLUMN `batch_number` VARCHAR(255) NOT NULL,
    ADD COLUMN `type` ENUM('token', 'nft', 'user') NOT NULL;

-- AlterTable
ALTER TABLE `trend_registry` ADD COLUMN `batch_number` VARCHAR(255) NOT NULL;
