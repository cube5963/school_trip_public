/*
  Warnings:

  - Added the required column `people` to the `Hotel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Hotel` ADD COLUMN `people` INTEGER NOT NULL;
