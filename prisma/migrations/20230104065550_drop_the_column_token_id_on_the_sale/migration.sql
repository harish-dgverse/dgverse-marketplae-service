/*
  Warnings:

  - You are about to drop the column `tokenId` on the `sale` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `sale` DROP FOREIGN KEY `token-Sale-fk`;

-- AlterTable
ALTER TABLE `sale` DROP COLUMN `tokenId`;
