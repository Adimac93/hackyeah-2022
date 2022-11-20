/*
  Warnings:

  - You are about to alter the column `cost` on the `ItemType` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `cost` on the `Trade` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `coins` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "ItemType" ALTER COLUMN "cost" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Trade" ALTER COLUMN "cost" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "coins" SET DATA TYPE INTEGER;
