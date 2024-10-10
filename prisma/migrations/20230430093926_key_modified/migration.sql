/*
  Warnings:

  - The primary key for the `Notifications` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `not_id` on the `Notifications` table. All the data in the column will be lost.
  - Added the required column `ntfcn_id` to the `Notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Notifications` DROP PRIMARY KEY,
    DROP COLUMN `not_id`,
    ADD COLUMN `ntfcn_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`ntfcn_id`);
