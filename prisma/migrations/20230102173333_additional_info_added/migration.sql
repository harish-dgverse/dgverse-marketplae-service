-- CreateTable
CREATE TABLE `additional_info` (
    `addt_info_id` INTEGER NOT NULL AUTO_INCREMENT,
    `attribute` VARCHAR(255) NOT NULL,
    `attr_value` VARCHAR(255) NOT NULL,
    `token_id` VARCHAR(255) NULL,
    `nft_id` VARCHAR(255) NULL,

    PRIMARY KEY (`addt_info_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `additional_info` ADD CONSTRAINT `additional_info_token_id_fkey` FOREIGN KEY (`token_id`) REFERENCES `token`(`token_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `additional_info` ADD CONSTRAINT `additional_info_nft_id_fkey` FOREIGN KEY (`nft_id`) REFERENCES `nft`(`nft_id`) ON DELETE CASCADE ON UPDATE CASCADE;
