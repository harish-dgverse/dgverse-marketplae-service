-- CreateTable
CREATE TABLE `AuctionHistory` (
    `auctionId` INTEGER NOT NULL AUTO_INCREMENT,
    `bidAmount` INTEGER NOT NULL,
    `bidderWalletId` INTEGER NOT NULL,
    `addedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`auctionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
