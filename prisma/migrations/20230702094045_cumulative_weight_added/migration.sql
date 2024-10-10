/*
  Warnings:

  - You are about to drop the column `total_weight` on the `trend_registry` table. All the data in the column will be lost.
  - Added the required column `weight` to the `trend_record_history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `trend_record_history` ADD COLUMN `weight` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `trend_registry` DROP COLUMN `total_weight`,
    ADD COLUMN `cumulative_weight` DOUBLE NOT NULL DEFAULT 0.0;
