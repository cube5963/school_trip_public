/*
  Warnings:

  - Added the required column `title` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `date` on the `Schedule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `Group` MODIFY `member2` VARCHAR(191) NULL,
    MODIFY `member3` VARCHAR(191) NULL,
    MODIFY `member4` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Schedule` ADD COLUMN `title` VARCHAR(191) NOT NULL,
    DROP COLUMN `date`,
    ADD COLUMN `date` INTEGER NOT NULL;
