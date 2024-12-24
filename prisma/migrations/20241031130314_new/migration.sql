-- DropForeignKey
ALTER TABLE `Focus` DROP FOREIGN KEY `Focus_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Focus` ADD CONSTRAINT `Focus_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
