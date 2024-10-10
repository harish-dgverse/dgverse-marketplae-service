/*
  Warnings:

  - The primary key for the `trend` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `trend` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`unique_id`);
