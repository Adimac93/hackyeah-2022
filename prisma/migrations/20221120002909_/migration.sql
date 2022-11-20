-- CreateTable
CREATE TABLE "ShopOffert" (
    "id" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,

    CONSTRAINT "ShopOffert_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ShopOffert" ADD CONSTRAINT "ShopOffert_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ItemType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
