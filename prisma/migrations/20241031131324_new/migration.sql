/*
  Warnings:

  - You are about to drop the column `userId` on the `Focus` table. All the data in the column will be lost.
  - You are about to drop the `HotelBooking` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hotel1` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hotel2` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hotel3` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Focus` DROP FOREIGN KEY `Focus_userId_fkey`;

-- DropForeignKey
ALTER TABLE `HotelBooking` DROP FOREIGN KEY `HotelBooking_userId_fkey`;

-- AlterTable
ALTER TABLE `Focus` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `hotel1` VARCHAR(191) NOT NULL,
    ADD COLUMN `hotel2` VARCHAR(191) NOT NULL,
    ADD COLUMN `hotel3` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `HotelBooking`;
