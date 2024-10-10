/*
  Warnings:

  - The primary key for the `trend_record_history` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `follow` on the `trend_record_history` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `trend_record_history` table. All the data in the column will be lost.
  - You are about to drop the column `like` on the `trend_record_history` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `trend_record_history` table. All the data in the column will be lost.
  - You are about to drop the column `trend_id` on the `trend_record_history` table. All the data in the column will be lost.
  - The primary key for the `trend_registry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `last_price` on the `trend_registry` table. All the data in the column will be lost.
  - You are about to drop the column `price_change` on the `trend_registry` table. All the data in the column will be lost.
  - You are about to drop the column `trend_weight` on the `trend_registry` table. All the data in the column will be lost.
  - You are about to drop the column `unique_id` on the `trend_registry` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[identifier]` on the table `trend_registry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identifier` to the `trend_record_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trendMode` to the `trend_record_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trendType` to the `trend_record_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tsh_id` to the `trend_record_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identifier` to the `trend_registry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `trend_registry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `trend_record_history` DROP FOREIGN KEY `trend_record_history_trend_id_fkey`;

-- DropIndex
DROP INDEX `trend_registry_unique_id_key` ON `trend_registry`;

-- AlterTable
ALTER TABLE `trend_record_history` DROP PRIMARY KEY,
    DROP COLUMN `follow`,
    DROP COLUMN `id`,
    DROP COLUMN `like`,
    DROP COLUMN `price`,
    DROP COLUMN `trend_id`,
    ADD COLUMN `identifier` VARCHAR(255) NOT NULL,
    ADD COLUMN `trendMode` ENUM('like', 'views', 'share', 'follow', 'mint', 'create', 'wishlist') NOT NULL,
    ADD COLUMN `trendType` ENUM('token', 'nft', 'user') NOT NULL,
    ADD COLUMN `tsh_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`tsh_id`);

-- AlterTable
ALTER TABLE `trend_registry` DROP PRIMARY KEY,
    DROP COLUMN `last_price`,
    DROP COLUMN `price_change`,
    DROP COLUMN `trend_weight`,
    DROP COLUMN `unique_id`,
    ADD COLUMN `identifier` VARCHAR(191) NOT NULL,
    ADD COLUMN `total_share` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `total_transfer` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `total_view` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `total_weight` DOUBLE NOT NULL DEFAULT 0.0,
    ADD COLUMN `total_wishlist` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `type` ENUM('token', 'nft', 'user') NOT NULL,
    ADD PRIMARY KEY (`identifier`);

-- CreateIndex
CREATE UNIQUE INDEX `trend_registry_identifier_key` ON `trend_registry`(`identifier`);
