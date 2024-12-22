"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    PRISMA_DECLINE_INVITATION,
    PRISMA_ACCEPT_INVITATION,
    PRISMA_GET_USER,
} from "@api/prismaFuncs"
import { useAuth } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { LoaderCircle } from "lucide-react"

// TODO - change to form

const formSchema = z.object({})

export default function InviteOptions({
    boardId,
    itemsIdArray,
    notificationId,
    invitation,
    boardName,
}) {
    const { userId } = useAuth()

    const form = useForm({
        resolver: zodResolver(formSchema),
    })

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
        const user = await PRISMA_GET_USER(userId)
        let content = `${user.name} joined ${boardName}!`
        await PRISMA_ACCEPT_INVITATION(
            boardId,
            itemsIdArray,
            notificationId,
            invitation.id,
            content,
        )
        setStatus("Accepted")
    }
    const handleDecline = async () => {
        await PRISMA_DECLINE_INVITATION(invitation.id, notificationId)
        setStatus("Declined")
    }

    if (status) {
        return (
            <p
                className={`col-start-2 col-end-3 row-start-3 text-sm font-medium ${status == "Accepted" ? "text-emerald-500" : "text-rose-500"}`}
            >
                {status}
            </p>
        )
    }

    return (
        <div className={`col-start-2 col-end-3 row-start-3 flex gap-2`}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAccept)}>
                    <Button
                        type="submit"
                        size="sm"
                        variant="outline"
                        className={`border border-emerald-500 text-emerald-600 hover:border-emerald-600 hover:bg-emerald-600/30 dark:border dark:border-emerald-500 dark:text-emerald-50 dark:hover:border-emerald-600 dark:hover:bg-emerald-600/30`}
                    >
                        {form.formState.isSubmitting && (
                            <LoaderCircle className={`h-4 w-4 animate-spin`} />
                        )}
                        {!form.formState.isSubmitting && "Accept"}
                    </Button>
                </form>
                <form
                    onSubmit={form.handleSubmit(handleDecline)}
                    className="space-y-8"
                >
                    <Button type="submit" size="sm" variant="destructive">
                        {form.formState.isSubmitting && (
                            <LoaderCircle className={`h-4 w-4 animate-spin`} />
                        )}
                        {!form.formState.isSubmitting && "Decline"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
