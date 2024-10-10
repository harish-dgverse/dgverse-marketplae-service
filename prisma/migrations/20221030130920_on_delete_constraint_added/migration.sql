-- DropForeignKey
ALTER TABLE `auction` DROP FOREIGN KEY `currentBidderId-Sale-user-fk`;

-- DropForeignKey
ALTER TABLE `auction_bids` DROP FOREIGN KEY `bidderWalletId-Sale-user-fk`;

-- DropForeignKey
ALTER TABLE `direct_sale_counter_offers` DROP FOREIGN KEY `offeredByUserId-Sale-user-fk`;

-- DropForeignKey
ALTER TABLE `nft` DROP FOREIGN KEY `nft_token_id_fkey`;

-- DropForeignKey
ALTER TABLE `nft` DROP FOREIGN KEY `nft_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `nft` DROP FOREIGN KEY `nft_wallet_address_fkey`;

-- DropForeignKey
ALTER TABLE `sale` DROP FOREIGN KEY `sale_buyerId_fkey`;

-- DropForeignKey
ALTER TABLE `sale` DROP FOREIGN KEY `sale_sellerId_fkey`;

-- DropForeignKey
ALTER TABLE `token` DROP FOREIGN KEY `token_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `token` DROP FOREIGN KEY `token_wallet_id_fkey`;

-- DropForeignKey
ALTER TABLE `user-relation-to-token` DROP FOREIGN KEY `user-relation-to-token_token_id_fkey`;

-- AddForeignKey
ALTER TABLE `token` ADD CONSTRAINT `token_wallet_id_fkey` FOREIGN KEY (`wallet_id`) REFERENCES `wallet`(`wallet_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `token` ADD CONSTRAINT `token_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nft` ADD CONSTRAINT `nft_token_id_fkey` FOREIGN KEY (`token_id`) REFERENCES `token`(`token_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nft` ADD CONSTRAINT `nft_wallet_address_fkey` FOREIGN KEY (`wallet_address`) REFERENCES `wallet`(`wallet_address`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nft` ADD CONSTRAINT `nft_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user-relation-to-token` ADD CONSTRAINT `user-relation-to-token_token_id_fkey` FOREIGN KEY (`token_id`) REFERENCES `token`(`token_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sale` ADD CONSTRAINT `sale_buyerId_fkey` FOREIGN KEY (`buyerId`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sale` ADD CONSTRAINT `sale_sellerId_fkey` FOREIGN KEY (`sellerId`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auction` ADD CONSTRAINT `currentBidderId-Sale-user-fk` FOREIGN KEY (`currentBidderId`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auction_bids` ADD CONSTRAINT `bidderWalletId-Sale-user-fk` FOREIGN KEY (`bidderWalletId`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `direct_sale_counter_offers` ADD CONSTRAINT `offeredByUserId-Sale-user-fk` FOREIGN KEY (`offeredByUserId`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
