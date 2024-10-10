/*
  Warnings:

  - You are about to drop the column `created_at` on the `favorites` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `nft` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `search` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `tags` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `token` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `trend_record_history` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `user_like` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `user_share` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `user_view` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `wallet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `favorites` DROP COLUMN `created_at`,
    ADD COLUMN `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `nft` DROP COLUMN `created_at`,
    ADD COLUMN `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `search` DROP COLUMN `created_at`,
    ADD COLUMN `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `tags` DROP COLUMN `created_at`,
    ADD COLUMN `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `token` DROP COLUMN `created_at`,
    ADD COLUMN `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `trend_record_history` DROP COLUMN `created_at`,
    ADD COLUMN `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `user` DROP COLUMN `created_at`,
    ADD COLUMN `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `user_like` DROP COLUMN `created_at`,
    ADD COLUMN `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `user_share` DROP COLUMN `created_at`,
    ADD COLUMN `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `user_view` DROP COLUMN `created_at`,
    ADD COLUMN `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `wallet` DROP COLUMN `created_at`,
    ADD COLUMN `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
