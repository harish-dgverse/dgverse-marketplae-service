/*
  Warnings:

  - A unique constraint covering the columns `[token_id,wallet_address]` on the table `user-relation-to-token` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `token_id_wallet_address` ON `user-relation-to-token`(`token_id`, `wallet_address`);
