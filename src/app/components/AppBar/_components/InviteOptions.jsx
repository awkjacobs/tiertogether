"use client"

import { useState } from "react"
import { Button } from "../../ui/button"
import {
    PRISMA_ACCEPT_INVITATION,
    PRISMA_DECLINE_INVITATION,
    PRISMA_JOIN_BOARD,
    PRISMA_VIEW_NOTIFICATION,
} from "@prismaFuncs/prismaFuncs"
import { useAuth } from "@clerk/nextjs"

// TODO - change to form

export default function InviteOptions({
    boardId,
    itemsIdArray,
    notificationId,
    invitation,
}) {
    const { userId } = useAuth()

    const userInAccepted =
        invitation.accepted.filter((user) => user.id === userId).length > 0
    const userInDeclined =
        invitation.declined.filter((user) => user.id === userId).length > 0

    const userReplied = () => {
        if (!userInAccepted && !userInDeclined) return null
        else if (userInAccepted && !userInDeclined) return "Accepted"
        else if (userInDeclined && !userInAccepted) return "Declined"
    }

    const [status, setStatus] = useState(userReplied())

    const handleAccept = async () => {
        await PRISMA_JOIN_BOARD(boardId, itemsIdArray)
        await PRISMA_VIEW_NOTIFICATION(notificationId)
        await PRISMA_ACCEPT_INVITATION(invitation.id)
        setStatus("Accepted")
    }
    const handleDecline = async () => {
        await PRISMA_VIEW_NOTIFICATION(notificationId)
        await PRISMA_DECLINE_INVITATION(invitation.id)
        setStatus("Declined")
    }

    if (status) {
        return (
            <p
                className={`col-start-2 col-end-3 row-start-4 text-sm font-medium ${status == "Accepted" ? "text-emerald-500" : "text-rose-500"}`}
            >
                {status}
            </p>
        )
    }

    return (
        <div className={`col-start-2 col-end-3 row-start-4 flex gap-2`}>
            <Button
                onClick={handleAccept}
                size="sm"
                variant="outline"
                className={`border border-emerald-500 text-emerald-600 hover:border-emerald-600 hover:bg-emerald-600/30 dark:border dark:border-emerald-500 dark:text-emerald-50 dark:hover:border-emerald-600 dark:hover:bg-emerald-600/30`}
            >
                Accept
            </Button>
            <Button onClick={handleDecline} size="sm" variant="destructive">
                Decline
            </Button>
        </div>
    )
}
