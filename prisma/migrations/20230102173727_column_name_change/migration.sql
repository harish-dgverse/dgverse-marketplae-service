/*
  Warnings:

  - You are about to drop the column `attr_value` on the `additional_info` table. All the data in the column will be lost.
  - Added the required column `value` to the `additional_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `additional_info` DROP COLUMN `attr_value`,
    ADD COLUMN `value` VARCHAR(255) NOT NULL;
