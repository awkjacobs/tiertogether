-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_notificationId_fkey";

-- AlterTable
ALTER TABLE "Invitation" ALTER COLUMN "notificationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE SET NULL ON UPDATE CASCADE;
