/*
  Warnings:

  - A unique constraint covering the columns `[type,unique_id]` on the table `trend` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `trend_type_identifier` ON `trend`(`type`, `unique_id`);
