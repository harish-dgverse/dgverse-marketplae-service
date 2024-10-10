-- CreateTable
CREATE TABLE `user_like` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `like` BOOLEAN NULL DEFAULT false,
    `token_id` VARCHAR(255) NULL,
    `nft_id` VARCHAR(255) NULL,
    `user_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_like` ADD CONSTRAINT `token-like-fk` FOREIGN KEY (`token_id`) REFERENCES `token`(`token_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_like` ADD CONSTRAINT `nft-like-fk` FOREIGN KEY (`nft_id`) REFERENCES `nft`(`nft_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_like` ADD CONSTRAINT `user-like-fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;
