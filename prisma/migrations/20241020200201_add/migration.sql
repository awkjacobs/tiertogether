/*
  Warnings:

  - You are about to drop the column `boardId` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Items` table. All the data in the column will be lost.
  - The primary key for the `Rank` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `boardId` to the `Rank` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Rank" DROP CONSTRAINT "Rank_itemsId_fkey";

-- AlterTable
ALTER TABLE "Items" DROP COLUMN "boardId",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Rank" DROP CONSTRAINT "Rank_pkey",
ADD COLUMN     "boardId" TEXT NOT NULL,
ADD CONSTRAINT "Rank_pkey" PRIMARY KEY ("userId", "itemsId", "boardId");

-- AddForeignKey
ALTER TABLE "Rank" ADD CONSTRAINT "Rank_itemsId_fkey" FOREIGN KEY ("itemsId") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rank" ADD CONSTRAINT "Rank_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
