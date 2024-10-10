-- CreateTable
CREATE TABLE `Notifications` (
    `not_id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(255) NOT NULL,
    `identifier` VARCHAR(255) NOT NULL,
    `message` VARCHAR(255) NOT NULL,
    `redirectionLink` VARCHAR(255) NOT NULL,
    `user_id` INTEGER NULL,
    `readFlag` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`not_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `user-notifications-fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;
