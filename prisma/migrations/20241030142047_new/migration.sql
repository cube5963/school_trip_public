/*
  Warnings:

  - Added the required column `loginid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `loginid` VARCHAR(191) NOT NULL;
