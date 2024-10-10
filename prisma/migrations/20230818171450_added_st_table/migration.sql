-- CreateTable
CREATE TABLE `SocialToken` (
    `StId` INTEGER NOT NULL AUTO_INCREMENT,
    `token_id` VARCHAR(255) NOT NULL,
    `ownedBy` INTEGER NOT NULL,
    `ownedByWalletId` VARCHAR(255) NOT NULL,
    `volume` INTEGER NOT NULL,
    `lastSaleDoneAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`StId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SocialToken` ADD CONSTRAINT `SocialToken_token_id_fkey` FOREIGN KEY (`token_id`) REFERENCES `token`(`token_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialToken` ADD CONSTRAINT `SocialToken_ownedBy_fkey` FOREIGN KEY (`ownedBy`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
