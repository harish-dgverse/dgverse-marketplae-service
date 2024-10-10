/*
  Warnings:

  - Added the required column `tokenType` to the `sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sale` ADD COLUMN `orginalVolume` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `tokenId` VARCHAR(255) NULL,
    ADD COLUMN `tokenType` VARCHAR(255) NOT NULL,
    ADD COLUMN `volume` INTEGER NOT NULL DEFAULT 1,
    MODIFY `nftId` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `social_token_sales` (
    `stSaleId` INTEGER NOT NULL AUTO_INCREMENT,
    `saleId` INTEGER NOT NULL,
    `buyerId` INTEGER NULL,
    `sellerId` INTEGER NOT NULL,
    `volume` INTEGER NOT NULL DEFAULT 1,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`stSaleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sale` ADD CONSTRAINT `ft-Sale-fk` FOREIGN KEY (`tokenId`) REFERENCES `token`(`token_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `social_token_sales` ADD CONSTRAINT `social_token_sales_buyerId_fkey` FOREIGN KEY (`buyerId`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `social_token_sales` ADD CONSTRAINT `social_token_sales_sellerId_fkey` FOREIGN KEY (`sellerId`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `social_token_sales` ADD CONSTRAINT `social_token_sales_saleId_fkey` FOREIGN KEY (`saleId`) REFERENCES `sale`(`saleId`) ON DELETE CASCADE ON UPDATE CASCADE;
