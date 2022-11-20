/*
  Warnings:

  - You are about to alter the column `cost` on the `ItemType` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "ItemType" ALTER COLUMN "cost" SET DATA TYPE INTEGER;
