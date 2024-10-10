-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `nft-image-fk`;

-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `token-image-fk`;

-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `user-image-fk`;

-- DropForeignKey
ALTER TABLE `wallet` DROP FOREIGN KEY `wallet_user_id_fkey`;

-- AlterTable
ALTER TABLE `social_media` ADD COLUMN `nft_id` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `social_media` ADD CONSTRAINT `social_media_nft_id_fkey` FOREIGN KEY (`nft_id`) REFERENCES `nft`(`nft_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wallet` ADD CONSTRAINT `wallet_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `token-image-fk` FOREIGN KEY (`token_id`) REFERENCES `token`(`token_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `nft-image-fk` FOREIGN KEY (`nft_id`) REFERENCES `nft`(`nft_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `user-image-fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
