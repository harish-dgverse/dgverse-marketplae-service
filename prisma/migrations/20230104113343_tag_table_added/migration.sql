-- CreateTable
CREATE TABLE `tags` (
    `tag_id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tag` VARCHAR(255) NOT NULL,
    `token_id` VARCHAR(255) NULL,
    `nft_id` VARCHAR(255) NULL,

    PRIMARY KEY (`tag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tags` ADD CONSTRAINT `token-tag-fk` FOREIGN KEY (`token_id`) REFERENCES `token`(`token_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tags` ADD CONSTRAINT `nft-tag-fk` FOREIGN KEY (`nft_id`) REFERENCES `nft`(`nft_id`) ON DELETE SET NULL ON UPDATE CASCADE;
