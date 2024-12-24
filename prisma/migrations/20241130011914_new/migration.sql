/*
  Warnings:

  - Added the required column `dummy4` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Quiz` ADD COLUMN `dummy4` VARCHAR(191) NOT NULL;
