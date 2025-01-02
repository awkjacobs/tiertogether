/*
  Warnings:

  - The primary key for the `Items` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `newId` on the `Items` table. All the data in the column will be lost.
  - The primary key for the `Rank` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_BoardToItems` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_ItemsToUser` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Rank" DROP CONSTRAINT "Rank_itemsId_fkey";

-- DropForeignKey
ALTER TABLE "_BoardToItems" DROP CONSTRAINT "_BoardToItems_B_fkey";

-- DropForeignKey
ALTER TABLE "_ItemsToUser" DROP CONSTRAINT "_ItemsToUser_A_fkey";

-- AlterTable
ALTER TABLE "Items" DROP CONSTRAINT "Items_pkey",
DROP COLUMN "newId",
ADD COLUMN     "oldId" INTEGER,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "type" DROP NOT NULL,
ADD CONSTRAINT "Items_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Rank" DROP CONSTRAINT "Rank_pkey",
ALTER COLUMN "itemsId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Rank_pkey" PRIMARY KEY ("userId", "itemsId", "boardId");

-- AlterTable
ALTER TABLE "_BoardToItems" DROP CONSTRAINT "_BoardToItems_AB_pkey",
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_BoardToItems_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "_ItemsToUser" DROP CONSTRAINT "_ItemsToUser_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE TEXT,
ADD CONSTRAINT "_ItemsToUser_AB_pkey" PRIMARY KEY ("A", "B");

-- AddForeignKey
ALTER TABLE "Rank" ADD CONSTRAINT "Rank_itemsId_fkey" FOREIGN KEY ("itemsId") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoardToItems" ADD CONSTRAINT "_BoardToItems_B_fkey" FOREIGN KEY ("B") REFERENCES "Items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemsToUser" ADD CONSTRAINT "_ItemsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
