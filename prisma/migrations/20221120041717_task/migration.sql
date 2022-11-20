-- CreateEnum
CREATE TYPE "Area" AS ENUM ('HOME', 'PILE');

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "area" "Area" NOT NULL,
    "lastAccessed" TIMESTAMP(3) NOT NULL,
    "timeToRestart" INTEGER NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_name_key" ON "Task"("name");
