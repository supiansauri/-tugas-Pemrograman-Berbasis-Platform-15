/*
  Warnings:

  - You are about to drop the `cards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `cards` DROP FOREIGN KEY `cards_username_fkey`;

-- DropTable
DROP TABLE `cards`;

-- CreateTable
CREATE TABLE `sepatu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `merk` VARCHAR(25) NOT NULL,
    `ukuran` VARCHAR(4) NOT NULL,
    `harga` INTEGER NOT NULL,
    `stok` INTEGER NOT NULL,
    `warna` VARCHAR(10) NOT NULL,
    `username` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sepatu` ADD CONSTRAINT `sepatu_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
