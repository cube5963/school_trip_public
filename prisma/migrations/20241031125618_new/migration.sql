/*
  Warnings:

  - You are about to drop the column `loginid` on the `Focus` table. All the data in the column will be lost.
  - You are about to drop the column `hotel1` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hotel2` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hotel3` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `loginid` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[loginId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Focus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loginId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Focus` DROP COLUMN `loginid`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Hotel` MODIFY `member1` VARCHAR(191) NULL,
    MODIFY `member2` VARCHAR(191) NULL,
    MODIFY `member3` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `hotel1`,
    DROP COLUMN `hotel2`,
    DROP COLUMN `hotel3`,
    DROP COLUMN `loginid`,
    ADD COLUMN `loginId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `HotelBooking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `day` INTEGER NOT NULL,
    `room` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_loginId_key` ON `User`(`loginId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

-- AddForeignKey
ALTER TABLE `HotelBooking` ADD CONSTRAINT `HotelBooking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Focus` ADD CONSTRAINT `Focus_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
