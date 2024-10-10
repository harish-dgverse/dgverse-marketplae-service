/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `newsletterlist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `newsletterlist_email_key` ON `newsletterlist`(`email`);
