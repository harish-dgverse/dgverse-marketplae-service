/*
  Warnings:

  - You are about to alter the column `operationType` on the `direct_sale_counter_offers` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Enum("direct_sale_counter_offers_operationType")`.

*/
-- AlterTable
ALTER TABLE `direct_sale_counter_offers` MODIFY `operationType` ENUM('BUYER_OFFER', 'SELLER_COUNTER', 'BUYER_REJECTION', 'SELLER_REJECTION') NOT NULL;
