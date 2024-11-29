-- AlterTable
ALTER TABLE "_BoardToItems" ADD CONSTRAINT "_BoardToItems_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_BoardToItems_AB_unique";

-- AlterTable
ALTER TABLE "_BoardToUser" ADD CONSTRAINT "_BoardToUser_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_BoardToUser_AB_unique";

-- AlterTable
ALTER TABLE "_InvitationAccepted" ADD CONSTRAINT "_InvitationAccepted_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_InvitationAccepted_AB_unique";

-- AlterTable
ALTER TABLE "_InvitationDeclined" ADD CONSTRAINT "_InvitationDeclined_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_InvitationDeclined_AB_unique";

-- AlterTable
ALTER TABLE "_ItemsToUser" ADD CONSTRAINT "_ItemsToUser_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ItemsToUser_AB_unique";

-- AlterTable
ALTER TABLE "_NotificationViewed" ADD CONSTRAINT "_NotificationViewed_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_NotificationViewed_AB_unique";
