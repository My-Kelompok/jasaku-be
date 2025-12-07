/*
  Warnings:

  - You are about to drop the `tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tokens` DROP FOREIGN KEY `tokens_userId_fkey`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `token` VARCHAR(100) NULL;

-- DropTable
DROP TABLE `tokens`;
