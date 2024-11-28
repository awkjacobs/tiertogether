"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Eye, ListFilter, LoaderCircle } from "lucide-react"
import { Form } from "@/components/ui/form"

import { useForm } from "react-hook-form"

import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import Notification from "./Notification"
import { useQuery } from "@tanstack/react-query"
import getNotifications from "./getNotifications"
import { useAuth } from "@clerk/nextjs"
import { PRISMA_VIEW_NOTIFICATIONS } from "@prismaFuncs/prismaFuncs"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { useState } from "react"

export default function Notifications({ boardIdArray }) {
    const { userId } = useAuth()
    const [filter, setFilter] = useState("All")

    const { data, isError, isPending, error } = useQuery({
        queryKey: ["notifications", ...boardIdArray],
        queryFn: () => getNotifications(boardIdArray),
    })

    const unreadNotifications = data.filter(
        (notification) =>
            !notification.viewed.map((view) => view.id).includes(userId),
    )
    const invites = data.filter(
        (notification) => notification.type == "Invitation",
    )
    const items = data.filter(
        (notification) =>
            notification.type == "itemAdded" ||
            notification.type == "itemRemoved",
    )
    const users = data.filter(
        (notification) =>
            notification.type == "join" ||
            notification.type == "leave" ||
            notification.type == "kick",
    )

    const filteredNotifications = () => {
        if (filter == "All") return data
        else if (filter == "Unread") return unreadNotifications
        else if (filter == "Invites") return invites
        else if (filter == "Items") return items
        else if (filter == "Users") return users
    }
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
                <DropdownMenuLabel className={`sticky flex items-center gap-2`}>
                    <ListFilter
                        className={`text-purple-800 dark:text-purple-400`}
                    />
                    <ToggleGroup
                        type="single"
                        value={filter}
                        onValueChange={setFilter}
                    >
                        <ToggleGroupItem className={`h-6 text-xs`} value="All">
                            All
                        </ToggleGroupItem>

                        <ToggleGroupItem
                            className={`h-6 text-xs`}
                            value="Unread"
                        >
                            Unread
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            className={`h-6 text-xs`}
                            value="Invites"
                        >
                            Invites
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            className={`h-6 text-xs`}
                            value="Items"
                        >
                            Items
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            className={`h-6 text-xs`}
                            value="Users"
                        >
                            Users
                        </ToggleGroupItem>
                    </ToggleGroup>
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
                        filteredNotifications().map((item) => (
                            <Notification notification={item} key={item.id} />
                        ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
