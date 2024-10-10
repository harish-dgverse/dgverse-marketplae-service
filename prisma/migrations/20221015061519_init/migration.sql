-- CreateTable
CREATE TABLE `token` (
    `token_id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `symbol` VARCHAR(255) NULL,
    `treasury_account` VARCHAR(255) NULL,
    `auto_renew_account_id` VARCHAR(255) NULL,
    `auto_renew_time_period` VARCHAR(255) NULL,
    `description` VARCHAR(191) NULL,
    `kyc_key` VARCHAR(255) NULL,
    `admin_key` VARCHAR(255) NULL,
    `supply_key` VARCHAR(255) NULL,
    `wipe_key` VARCHAR(255) NULL,
    `private_key` VARCHAR(255) NOT NULL,
    `freeze_key` VARCHAR(255) NULL,
    `pause_key` VARCHAR(255) NULL,
    `fee_schedule_key` VARCHAR(255) NULL,
    `is_nft` BOOLEAN NULL,
    `default_freeze_status` VARCHAR(255) NULL,
    `decimal` VARCHAR(255) NULL,
    `total_supply` VARCHAR(255) NULL,
    `status` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `wallet_id` INTEGER NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`token_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nft` (
    `nft_id` VARCHAR(255) NOT NULL,
    `description` VARCHAR(191) NULL,
    `nft_name` VARCHAR(255) NOT NULL,
    `status` VARCHAR(255) NULL,
    `token_id` VARCHAR(255) NOT NULL,
    `serial_number` INTEGER NOT NULL,

    UNIQUE INDEX `nft_nft_id_key`(`nft_id`),
    PRIMARY KEY (`nft_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user-relation-to-token` (
    `user_id` INTEGER NOT NULL,
    `freeze_status` BOOLEAN NULL,
    `kyc_status` BOOLEAN NULL,
    `token_id` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `user-relation-to-token_token_id_key`(`token_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `social_media` (
    `social_media_id` INTEGER NOT NULL AUTO_INCREMENT,
    `media` VARCHAR(255) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `token_id` VARCHAR(255) NULL,
    `user_id` INTEGER NULL,

    PRIMARY KEY (`social_media_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wallet` (
    `wallet_id` INTEGER NOT NULL AUTO_INCREMENT,
    `wallet_client` VARCHAR(255) NOT NULL,
    `wallet_address` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` INTEGER NOT NULL,

    UNIQUE INDEX `wallet_wallet_address_key`(`wallet_address`),
    PRIMARY KEY (`wallet_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(255) NOT NULL,
    `user_role` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `image_id` INTEGER NULL,

    UNIQUE INDEX `user_user_name_key`(`user_name`),
    UNIQUE INDEX `user_image_id_key`(`image_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `image` (
    `image_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cover_pic` VARCHAR(255) NOT NULL,
    `display_pic` VARCHAR(255) NOT NULL,
    `icon` VARCHAR(255) NOT NULL,
    `thumbnail` VARCHAR(255) NOT NULL,
    `added_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` INTEGER NULL,
    `token_id` VARCHAR(255) NULL,

    UNIQUE INDEX `image_user_id_key`(`user_id`),
    UNIQUE INDEX `image_token_id_key`(`token_id`),
    PRIMARY KEY (`image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `token` ADD CONSTRAINT `token_wallet_id_fkey` FOREIGN KEY (`wallet_id`) REFERENCES `wallet`(`wallet_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `token` ADD CONSTRAINT `token_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nft` ADD CONSTRAINT `nft_token_id_fkey` FOREIGN KEY (`token_id`) REFERENCES `token`(`token_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user-relation-to-token` ADD CONSTRAINT `user-relation-to-token_token_id_fkey` FOREIGN KEY (`token_id`) REFERENCES `token`(`token_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `social_media` ADD CONSTRAINT `social_media_token_id_fkey` FOREIGN KEY (`token_id`) REFERENCES `token`(`token_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `social_media` ADD CONSTRAINT `social_media_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wallet` ADD CONSTRAINT `wallet_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `token-image-fk` FOREIGN KEY (`token_id`) REFERENCES `token`(`token_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `user-image-fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;
