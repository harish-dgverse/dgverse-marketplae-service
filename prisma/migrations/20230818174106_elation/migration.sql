-- DropForeignKey
ALTER TABLE `token` DROP FOREIGN KEY `token_wallet_id_fkey`;

-- AlterTable
ALTER TABLE `token` MODIFY `wallet_id` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `token` ADD CONSTRAINT `token_wallet_id_fkey` FOREIGN KEY (`wallet_id`) REFERENCES `wallet`(`wallet_address`) ON DELETE CASCADE ON UPDATE CASCADE;
