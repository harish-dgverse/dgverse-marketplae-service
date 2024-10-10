-- CreateTable
CREATE TABLE `user_share` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `media` VARCHAR(255) NOT NULL,
    `token_id` VARCHAR(255) NULL,
    `nft_id` VARCHAR(255) NULL,
    `user_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_share` ADD CONSTRAINT `token-share-fk` FOREIGN KEY (`token_id`) REFERENCES `token`(`token_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_share` ADD CONSTRAINT `nft-share-fk` FOREIGN KEY (`nft_id`) REFERENCES `nft`(`nft_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_share` ADD CONSTRAINT `user-share-fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;
