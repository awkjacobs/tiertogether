import { Button } from "@app/components/ui/button"
import { AppDataContext } from "@components/_providers/appDataProvider"
import { Form } from "@components/ui/form"
import { Label } from "@components/ui/label"
import { ScrollArea } from "@components/ui/scroll-area"
import { cn } from "@lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { PRISMA_KICK_USER } from "@api/prismaFuncs"
import { LoaderCircle, UserMinus } from "lucide-react"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import InviteUserButton from "@components/Buttons/InviteUserButton"
import Crown from "@app/components/Utility/Crown"

export default function BoardUsersArea({ board }) {
    const { appData } = useContext(AppDataContext)

    const boardUsersMinusActiveUser = board.users
        .filter((user) => user.id !== appData.user.id)
        .toSorted((a, b) =>
            a.createdAt > b.createdAt ? 1 : a.createdAt < b.createdAt ? -1 : 0,
        )
    const activeUser = appData.user

    return (
        <div
            className={`flex flex-col overflow-hidden md:col-span-1 md:col-start-2 md:row-span-full`}
        >
            <Label
                htmlFor="users"
                className={`mb-2 flex flex-row text-purple-800 dark:text-purple-400`}
            >
                Board Users
            </Label>
            <ScrollArea
                id="users"
                className={`flex h-full min-w-40 flex-1 flex-col gap-4 py-2 pr-2`}
            >
                <UserListItem
                    user={activeUser}
                    board={board}
                    className={`font-bold`}
                />
                {boardUsersMinusActiveUser.map((user) => (
                    <UserListItem user={user} board={board} key={user.id} />
                ))}
            </ScrollArea>
            <InviteUserButton boardId={board.id} boardName={board.boardName} />
        </div>
    )
}

const formSchema = z.object({})

function UserListItem({ user, board, className }) {
    const form = useForm({
        resolver: zodResolver(formSchema),
    })
    async function onSubmit() {
        const itemsIdArray = board.items.map((item) => item.id)
        await PRISMA_KICK_USER(
            board.id,
            itemsIdArray,
            user.id,
            `${user.name} was removed from ${board.boardName}.`,
            "kick",
        ).finally(() => {
            toast(`${user.name} has been removed from ${board.boardName}`)
        })
    }

    const isOwner = user.id === board.ownerId

    return (
        <div className={`group flex h-8 items-center gap-4 text-sm`}>
            <p
                className={cn(
                    `flex-1 text-zinc-800 dark:text-purple-200`,
                    className,
                )}
            >
                {user.name}
            </p>
            {isOwner && (
                <Button variant="ghost" className={`h-8 w-8 p-0`}>
                    <Crown />
                </Button>
            )}
            {!isOwner && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <Button
                            variant="ghost"
                            type="submit"
                            disabled={isOwner}
                            className={`h-8 w-8 p-0 opacity-25 transition-opacity disabled:opacity-0 group-hover:opacity-100 disabled:group-hover:opacity-50 md:opacity-0 md:disabled:opacity-0`}
                        >
                            {!form.formState.isSubmitting && (
                                <UserMinus className={`h-4 w-4`} />
                            )}
                            {form.formState.isSubmitting && (
                                <LoaderCircle
                                    className={`h-4 w-4 animate-spin`}
                                />
                            )}
                        </Button>
                    </form>
                </Form>
            )}
        </div>
    )
}
