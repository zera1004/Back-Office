/*
  Warnings:

  - Added the required column `averageStar` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_restaurantId_fkey`;

-- DropIndex
DROP INDEX `Payment_restaurantId_fkey` ON `payment`;

-- AlterTable
ALTER TABLE `restaurant` ADD COLUMN `averageStar` INTEGER NOT NULL;
