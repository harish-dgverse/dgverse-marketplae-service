/*
  Warnings:

  - The primary key for the `favorites` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `favorites` table. All the data in the column will be lost.
  - The primary key for the `followings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `followings` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `followings` table. All the data in the column will be lost.
  - Added the required column `favorites_id` to the `favorites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followings_id` to the `followings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `favorites` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `favorites_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`favorites_id`);

-- AlterTable
ALTER TABLE `followings` DROP PRIMARY KEY,
    DROP COLUMN `created_at`,
    DROP COLUMN `id`,
    ADD COLUMN `followings_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD PRIMARY KEY (`followings_id`);

-- CreateTable
CREATE TABLE `search` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `unique_id` VARCHAR(191) NOT NULL,
    `unique_id_type` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `search_text` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_id_and_unique_id`(`user_id`, `unique_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `search_count` (
    `unique_id` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`unique_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `leaderboard` (
    `user_name` VARCHAR(20) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `total_asset_transaction` INTEGER NOT NULL DEFAULT 0,
    `total_sell_transaction` INTEGER NOT NULL DEFAULT 0,
    `current_asset_value` INTEGER NOT NULL DEFAULT 0,
    `current_followers` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `leaderboard_user_id_key`(`user_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trend` (
    `unique_id` VARCHAR(191) NOT NULL,
    `rank` INTEGER NOT NULL,

    UNIQUE INDEX `trend_unique_id_key`(`unique_id`),
    PRIMARY KEY (`rank`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trend_registry` (
    `unique_id` VARCHAR(191) NOT NULL,
    `last_price` DOUBLE NOT NULL DEFAULT 0.0,
    `price_change` DOUBLE NOT NULL DEFAULT 0.0,
    `total_like` INTEGER NOT NULL DEFAULT 0,
    `total_follow` INTEGER NOT NULL DEFAULT 0,
    `trend_weight` DOUBLE NOT NULL DEFAULT 0.0,

    UNIQUE INDEX `trend_registry_unique_id_key`(`unique_id`),
    PRIMARY KEY (`unique_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trend_record_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `price` DOUBLE NOT NULL DEFAULT 0.0,
    `like` INTEGER NOT NULL DEFAULT 0,
    `follow` INTEGER NOT NULL DEFAULT 0,
    `trend_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `trend_record_history` ADD CONSTRAINT `trend_record_history_trend_id_fkey` FOREIGN KEY (`trend_id`) REFERENCES `trend_registry`(`unique_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
