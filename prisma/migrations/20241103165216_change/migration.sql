/*
  Warnings:

  - You are about to drop the column `viewed` on the `Notification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "viewed";

-- CreateTable
CREATE TABLE "_NotificationViewed" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_NotificationViewed_AB_unique" ON "_NotificationViewed"("A", "B");

-- CreateIndex
CREATE INDEX "_NotificationViewed_B_index" ON "_NotificationViewed"("B");

-- AddForeignKey
ALTER TABLE "_NotificationViewed" ADD CONSTRAINT "_NotificationViewed_A_fkey" FOREIGN KEY ("A") REFERENCES "Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NotificationViewed" ADD CONSTRAINT "_NotificationViewed_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
