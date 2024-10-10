-- AlterTable
ALTER TABLE `nft` ADD COLUMN `mintedBy` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `nft` ADD CONSTRAINT `nft_mintedBy_fkey` FOREIGN KEY (`mintedBy`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
