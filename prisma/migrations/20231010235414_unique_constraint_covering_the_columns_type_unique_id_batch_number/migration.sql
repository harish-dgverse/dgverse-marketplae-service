/*
  Warnings:

  - A unique constraint covering the columns `[type,unique_id,batch_number]` on the table `trend` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[type,identifier,batch_number]` on the table `trend_registry` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `trend_type_identifier` ON `trend`;

-- DropIndex
DROP INDEX `trend_type_identifier` ON `trend_registry`;

-- CreateIndex
CREATE UNIQUE INDEX `trend_type_identifier` ON `trend`(`type`, `unique_id`, `batch_number`);

-- CreateIndex
CREATE UNIQUE INDEX `trend_type_identifier` ON `trend_registry`(`type`, `identifier`, `batch_number`);
