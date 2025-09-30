/*
  Warnings:

  - You are about to alter the column `status` on the `Client` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Client` MODIFY `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active';

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `type` ENUM('cd', 'vinyl') NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `currency` ENUM('euro', 'dollar') NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `tracklist` VARCHAR(191) NOT NULL,
    `prio` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
