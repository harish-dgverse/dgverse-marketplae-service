/*
  Warnings:

  - The values [HOLD] on the enum `sale_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `sale` MODIFY `status` ENUM('ON_GOING', 'COMPLETED', 'CANCELLED', 'EXPIRED') NOT NULL DEFAULT 'ON_GOING';

-- AlterTable
ALTER TABLE `trend_record_history` MODIFY `trendMode` ENUM('like', 'views', 'share', 'follow', 'mint', 'create', 'wishlist', 'transfer', 'onsale', 'salecancel', 'saleexpire') NOT NULL;
