-- CreateTable
CREATE TABLE `Group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `leader` VARCHAR(191) NOT NULL,
    `member2` VARCHAR(191) NOT NULL,
    `member3` VARCHAR(191) NOT NULL,
    `member4` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
