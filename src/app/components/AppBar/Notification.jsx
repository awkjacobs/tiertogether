import { useAuth } from "@clerk/nextjs"
import InviteNotification from "./_components/InviteNotification"
import StandardNotification from "./_components/StandardNotification"

export default function Notification({ notification }) {
    const { userId } = useAuth()
    const { type, viewed } = notification
    const viewedIds = viewed.map((view) => view.id)
    const userViewed = viewedIds.includes(userId)

    if (type == "Invitation")
        return (
            <InviteNotification
                notification={notification}
                userViewed={userViewed}
            />
        )
    return (
        <StandardNotification
            notification={notification}
            userViewed={userViewed}
        />
    )
}
