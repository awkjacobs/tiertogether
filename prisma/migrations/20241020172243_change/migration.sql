/*
  Warnings:

  - You are about to drop the column `accepted` on the `Invitation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Invitation" DROP COLUMN "accepted";

-- CreateTable
CREATE TABLE "_InvitationAccepted" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_InvitationDeclined" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_InvitationAccepted_AB_unique" ON "_InvitationAccepted"("A", "B");

-- CreateIndex
CREATE INDEX "_InvitationAccepted_B_index" ON "_InvitationAccepted"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InvitationDeclined_AB_unique" ON "_InvitationDeclined"("A", "B");

-- CreateIndex
CREATE INDEX "_InvitationDeclined_B_index" ON "_InvitationDeclined"("B");

-- AddForeignKey
ALTER TABLE "_InvitationAccepted" ADD CONSTRAINT "_InvitationAccepted_A_fkey" FOREIGN KEY ("A") REFERENCES "Invitation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvitationAccepted" ADD CONSTRAINT "_InvitationAccepted_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvitationDeclined" ADD CONSTRAINT "_InvitationDeclined_A_fkey" FOREIGN KEY ("A") REFERENCES "Invitation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvitationDeclined" ADD CONSTRAINT "_InvitationDeclined_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
