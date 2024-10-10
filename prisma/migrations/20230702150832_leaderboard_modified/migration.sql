/*
  Warnings:

  - The primary key for the `leaderboard` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `current_asset_value` on the `leaderboard` table. All the data in the column will be lost.
  - You are about to drop the column `current_followers` on the `leaderboard` table. All the data in the column will be lost.
  - You are about to drop the column `total_asset_transaction` on the `leaderboard` table. All the data in the column will be lost.
  - You are about to drop the column `total_sell_transaction` on the `leaderboard` table. All the data in the column will be lost.
  - Added the required column `batch_number` to the `leaderboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank` to the `leaderboard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `leaderboard` DROP PRIMARY KEY,
    DROP COLUMN `current_asset_value`,
    DROP COLUMN `current_followers`,
    DROP COLUMN `total_asset_transaction`,
    DROP COLUMN `total_sell_transaction`,
    ADD COLUMN `batch_number` VARCHAR(255) NOT NULL,
    ADD COLUMN `rank` INTEGER NOT NULL,
    MODIFY `user_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`user_id`);
