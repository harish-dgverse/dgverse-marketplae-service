-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `token-image-fk`;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `image_token_id_fkey` FOREIGN KEY (`token_id`) REFERENCES `token`(`token_id`) ON DELETE CASCADE ON UPDATE CASCADE;
