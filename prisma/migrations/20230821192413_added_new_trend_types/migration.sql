-- AlterTable
ALTER TABLE `trend` MODIFY `type` ENUM('token', 'nft', 'user', 'nftc', 'ft', 'sbt') NOT NULL;

-- AlterTable
ALTER TABLE `trend_record_history` MODIFY `trendType` ENUM('token', 'nft', 'user', 'nftc', 'ft', 'sbt') NOT NULL;

-- AlterTable
ALTER TABLE `trend_registry` MODIFY `type` ENUM('token', 'nft', 'user', 'nftc', 'ft', 'sbt') NOT NULL;
