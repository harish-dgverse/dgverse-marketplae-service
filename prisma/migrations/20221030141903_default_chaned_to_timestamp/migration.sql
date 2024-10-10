-- AlterTable
ALTER TABLE `auction` MODIFY `timestamp` TIMESTAMP(6) NOT NULL;

-- AlterTable
ALTER TABLE `auction_bids` MODIFY `timestamp` TIMESTAMP(6) NOT NULL;

-- AlterTable
ALTER TABLE `direct_sale` MODIFY `timestamp` TIMESTAMP(6) NOT NULL;

-- AlterTable
ALTER TABLE `direct_sale_counter_offers` MODIFY `timestamp` TIMESTAMP(6) NOT NULL;

-- AlterTable
ALTER TABLE `dutch_auction` MODIFY `timestamp` TIMESTAMP(6) NOT NULL;

-- AlterTable
ALTER TABLE `dutch_auction_decrements` MODIFY `timestamp` TIMESTAMP(6) NOT NULL;

-- AlterTable
ALTER TABLE `image` MODIFY `added_at` TIMESTAMP(6) NOT NULL;

-- AlterTable
ALTER TABLE `nft` MODIFY `created_at` TIMESTAMP(6) NOT NULL;

-- AlterTable
ALTER TABLE `sale` MODIFY `timestamp` TIMESTAMP(6) NOT NULL;

-- AlterTable
ALTER TABLE `token` MODIFY `created_at` TIMESTAMP(6) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `created_at` TIMESTAMP(6) NOT NULL;

-- AlterTable
ALTER TABLE `wallet` MODIFY `created_at` TIMESTAMP(6) NOT NULL;
