/*
  Warnings:

  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(6,2)`.
  - A unique constraint covering the columns `[uuid]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `artist` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `artist` VARCHAR(191) NOT NULL,
    MODIFY `price` DECIMAL(6, 2) NOT NULL,
    MODIFY `description` MEDIUMTEXT NOT NULL,
    MODIFY `tracklist` MEDIUMTEXT NOT NULL;

-- CreateTable
CREATE TABLE `Delivery` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `clientId` INTEGER NOT NULL,
    `Details` MEDIUMTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Delivery_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Client_uuid_key` ON `Client`(`uuid`);
