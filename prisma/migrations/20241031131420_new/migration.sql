/*
  Warnings:

  - Added the required column `loginId` to the `Focus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Focus` ADD COLUMN `loginId` VARCHAR(191) NOT NULL;
