/*
  Warnings:

  - You are about to drop the column `ac` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `challenge` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Quiz` DROP COLUMN `ac`,
    DROP COLUMN `challenge`;
