import { NOTIFICATION_ICONS } from "@/lib/const"
import { useGetInvitationData } from "@/app/hooks/use-get-notification"
import InviteOptions from "./InviteOptions"
import { Skeleton } from "../../ui/skeleton"
import { simplifiedDate } from "@/lib/utils"

export default function InviteNotification({ notification, userViewed }) {
    const { type, content, createdAt } = notification
    const { data, isLoading, isError } = useGetInvitationData(notification)

    return (
        <div
            className={`mx-2 my-1 h-fit items-start justify-start rounded-md border border-zinc-200 p-0 dark:border-zinc-900 ${userViewed ? "opacity-50" : "opacity-100"}`}
        >
            <div
                className={`grid w-full grid-cols-[auto_1fr] grid-rows-[auto] gap-2 p-4`}
            >
                {NOTIFICATION_ICONS[type]}
                <div
                    className={`flex w-full flex-row items-center gap-2 text-left`}
                >
                    <h5
                        className={`col-start-2 col-end-3 row-start-1 flex-1 text-wrap text-sm font-medium`}
                    >
                        {content}
                    </h5>
                    <p className="self-start text-xs opacity-50">
                        {simplifiedDate(createdAt)}
                    </p>
                </div>
                <p
                    className={`col-start-2 col-end-3 row-start-2 text-wrap rounded border-s-4 border-s-emerald-500 p-2 pl-4 text-sm dark:bg-zinc-900`}
                >
                    {isLoading && "Loading..."}
                    {isError && "Error..."}
                    {data && <b>{data.boardName}</b>}
                </p>
                {isLoading && (
                    <Skeleton
                        className={`col-start-2 col-end-3 row-start-3 h-8 w-full`}
                    />
                )}
                {isError && <p>Error...</p>}
                {!isLoading && !isError && (
                    <InviteOptions
                        boardId={data.id}
                        itemsIdArray={data.items.map((item) => item.id)}
                        notificationId={notification.id}
                        invitation={notification.Invitation}
                        boardName={data.boardName}
                    />
                )}
            </div>
        </div>
    )
}
