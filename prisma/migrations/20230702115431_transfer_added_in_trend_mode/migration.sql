-- AlterTable
ALTER TABLE `trend_record_history` MODIFY `trendMode` ENUM('like', 'views', 'share', 'follow', 'mint', 'create', 'wishlist', 'transfer') NOT NULL;
