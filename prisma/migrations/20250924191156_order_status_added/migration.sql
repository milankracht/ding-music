-- AlterTable
ALTER TABLE `Delivery` ADD COLUMN `status` ENUM('pending', 'error', 'processed') NOT NULL DEFAULT 'pending';
