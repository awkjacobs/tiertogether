import {
    PRISMA_GET_INVITATION,
    PRISMA_GET_SPECIFIC_BOARD,
} from "@prismaFuncs/prismaFuncs"
import InviteOptions from "./_components/InviteOptions"
import StandardNotification from "./_components/StandardNotification"
import { useAuth } from "@clerk/nextjs"
import { Form } from "../ui/form"
import { TYPE_RETURN } from "@/lib/const"

export default function Notification({ notification }) {
    const { userId } = useAuth()
    const { content, type, viewed, Invitation } = notification
    const viewedIds = viewed.map((view) => view.id)
    const userViewed = viewedIds.includes(userId)

    let board
    let itemsIdArray
    let invitation

    if (type == "Invitation") async () => await getInvite(Invitation.id)

    async function getInvite(id) {
        invitation = await PRISMA_GET_INVITATION(id)
        board = await PRISMA_GET_SPECIFIC_BOARD(invitation.boardId)
        itemsIdArray = board.items.map((item) => item.id)
    }

    if (type == "Invitation") {
        return (
            <div
                className={`mx-2 my-1 h-fit items-start justify-start rounded-md border border-zinc-200 p-0 dark:border-zinc-900 ${userViewed ? "opacity-50" : "opacity-100"}`}
            >
                <div
                    className={`grid w-full grid-cols-[auto_1fr] grid-rows-[auto] gap-2 p-4`}
                >
                    {TYPE_RETURN[type].icon}
                    <h5
                        className={` ${TYPE_RETURN[type].titleColor} col-start-2 col-end-3 row-start-1 text-sm font-medium`}
                    >
                        {TYPE_RETURN[type].title}
                    </h5>
                    <p
                        className={`col-start-2 col-end-3 row-start-2 text-wrap text-sm font-medium`}
                    >
                        {content}
                    </p>
                    <p
                        className={`col-start-2 col-end-3 row-start-3 text-wrap rounded border-s-4 border-s-emerald-500 p-2 pl-4 text-sm dark:bg-zinc-900`}
                    >
                        <b>{board.boardName}</b>
                    </p>
                    <InviteOptions
                        boardId={board.id}
                        itemsIdArray={itemsIdArray}
                        notificationId={notification.id}
                        invitation={Invitation}
                    />
                </div>
            </div>
        )
    }

    return (
        <StandardNotification
            content={content}
            type={type}
            userViewed={userViewed}
            notificationId={notification.id}
        />
    )
}
