-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `user-image-fk`;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `user-image-fk` FOREIGN KEY (`image_id`) REFERENCES `user`(`image_id`) ON DELETE CASCADE ON UPDATE CASCADE;
