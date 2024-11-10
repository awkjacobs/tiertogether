"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Eye, LoaderCircle } from "lucide-react"
import { Form } from "@/components/ui/form"

import { useForm } from "react-hook-form"

import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import Notification from "./Notification"
import { useQuery } from "@tanstack/react-query"
import getNotifications from "./getNotifications"
import { useAuth } from "@clerk/nextjs"
import { PRISMA_VIEW_NOTIFICATIONS } from "@prismaFuncs/prismaFuncs"

// TODO - setup mark all as read button
// TODO - setup click notification to mark as read

export default function Notifications({ boardIdArray }) {
    const { userId } = useAuth()

    const { data, isError, isPending, error } = useQuery({
        queryKey: ["notifications"],
        queryFn: () => getNotifications(boardIdArray),
    })

    const unreadNotifications = data.filter(
        (notification) =>
            !notification.viewed.map((view) => view.id).includes(userId),
    )
    const form = useForm({})

    async function onSubmit() {
        let viewedIds = unreadNotifications.map(
            (notification) => notification.id,
        )
        await PRISMA_VIEW_NOTIFICATIONS(viewedIds)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className={`relative h-10 self-start text-purple-800 dark:text-purple-300`}
                >
                    <Bell className={`h-[1.2rem] w-[1.2rem]`} />
                    {unreadNotifications.length > 0 && (
                        <Badge
                            className={`absolute right-[-4px] top-[-4px] bg-emerald-500 text-white dark:bg-emerald-500 dark:text-white`}
                        >
                            {unreadNotifications.length}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className={`relative mx-2 box-border w-[calc(100vw_-_16px)] overflow-hidden md:mx-0 md:w-[420px]`}
            >
                <DropdownMenuLabel
                    className={`sticky flex items-center justify-between text-purple-800 dark:text-purple-400`}
                >
                    Notifications
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`text-zinc-500`}
                                disabled={unreadNotifications.length === 0}
                            >
                                {form.formState.isSubmitting && (
                                    <>
                                        <LoaderCircle
                                            className={`h-4 w-4 animate-spin`}
                                        />
                                        Updating...
                                    </>
                                )}
                                {!form.formState.isSubmitting && (
                                    <>
                                        <Eye className={`pr-2`} />
                                        Mark All as Viewed
                                    </>
                                )}
                            </Button>
                        </form>
                    </Form>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div
                    className={`no-scrollbar flex h-[calc(100svh_-_9rem)] flex-col overflow-y-scroll md:h-[600px]`}
                >
                    {isPending && (
                        <div
                            className={`flex h-full items-center justify-center`}
                        >
                            <p>Loading...</p>
                        </div>
                    )}
                    {isError && (
                        <div
                            className={`flex h-full items-center justify-center`}
                        >
                            <p>Error...</p>
                            {error.message}
                        </div>
                    )}
                    {!isPending &&
                        !isError &&
                        data.map((item) => (
                            <Notification notification={item} key={item.id} />
                        ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
