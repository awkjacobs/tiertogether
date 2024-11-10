/*
  Warnings:

  - A unique constraint covering the columns `[notificationId]` on the table `Invitation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accepted` to the `Invitation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notificationId` to the `Invitation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Invitation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invitation" ADD COLUMN     "accepted" BOOLEAN NOT NULL,
ADD COLUMN     "notificationId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "invitationId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_notificationId_key" ON "Invitation"("notificationId");

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
