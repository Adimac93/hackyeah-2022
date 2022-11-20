/*
  Warnings:

  - You are about to drop the column `destinationUserId` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Trade` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Trade" DROP COLUMN "destinationUserId",
DROP COLUMN "status";

-- DropEnum
DROP TYPE "TradeStatus";
