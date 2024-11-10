-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_boardId_fkey";

-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_userId_fkey";

-- CreateTable
CREATE TABLE "_BoardToItems" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ItemsToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BoardToItems_AB_unique" ON "_BoardToItems"("A", "B");

-- CreateIndex
CREATE INDEX "_BoardToItems_B_index" ON "_BoardToItems"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ItemsToUser_AB_unique" ON "_ItemsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemsToUser_B_index" ON "_ItemsToUser"("B");

-- AddForeignKey
ALTER TABLE "_BoardToItems" ADD CONSTRAINT "_BoardToItems_A_fkey" FOREIGN KEY ("A") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoardToItems" ADD CONSTRAINT "_BoardToItems_B_fkey" FOREIGN KEY ("B") REFERENCES "Items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemsToUser" ADD CONSTRAINT "_ItemsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemsToUser" ADD CONSTRAINT "_ItemsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
