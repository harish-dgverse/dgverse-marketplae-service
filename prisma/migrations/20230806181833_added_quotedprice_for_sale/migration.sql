-- AlterTable
ALTER TABLE `sale` ADD COLUMN `expiresAt` DATETIME(3) NULL,
    ADD COLUMN `quotedPrice` INTEGER NULL,
    ADD COLUMN `saleDoneAt` DATETIME(3) NULL;
