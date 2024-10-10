/*
  Warnings:

  - A unique constraint covering the columns `[type,identifier]` on the table `trend_registry` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `trend_type_identifier` ON `trend_registry`(`type`, `identifier`);
