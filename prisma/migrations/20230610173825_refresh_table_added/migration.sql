-- CreateTable
CREATE TABLE `refreshToken` (
    `refTokId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `refToken` VARCHAR(511) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `refreshToken_refToken_key`(`refToken`),
    PRIMARY KEY (`refTokId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
