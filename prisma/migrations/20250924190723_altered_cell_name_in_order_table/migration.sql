/*
  Warnings:

  - You are about to drop the column `Details` on the `Delivery` table. All the data in the column will be lost.
  - Added the required column `details` to the `Delivery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Delivery` DROP COLUMN `Details`,
    ADD COLUMN `details` MEDIUMTEXT NOT NULL;
