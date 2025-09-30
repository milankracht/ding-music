-- AlterTable
ALTER TABLE `Order` ADD COLUMN `status` ENUM('pending', 'error', 'processed') NOT NULL DEFAULT 'pending';
