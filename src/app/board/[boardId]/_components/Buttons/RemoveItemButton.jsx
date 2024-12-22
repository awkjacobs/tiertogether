import * as React from "react"

import { PRISMA_DELETE_ITEM } from "@api/prismaFuncs"
import { LoaderCircle, Minus, X } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/app/components/ui/button"
import { toast } from "sonner"
import { useGetDetailsQuery } from "@/app/hooks/use-get-fetch-query"

export function RemoveItemButton({
    infoItem,
    appData,
    disabled,
    isDialog = false,
}) {
    const details = useGetDetailsQuery(infoItem.id, appData.board.type)
    async function handleRemove() {
        let content = `${details.data.name ? details.data.name : details.data.title} removed from ${appData.board.boardName}`
        await PRISMA_DELETE_ITEM(
            appData.board,
            infoItem,
            content,
            "itemRemoved",
        ).finally(() => {
            toast(content, {
                action: {
                    label: "Close",
                    onClick: () => null,
                },
            })
        })
    }
    const dialogButtonStyles = {
        true: `col-start-1 mx-auto flex flex-row items-center place-self-end transition-colors hover:bg-rose-600 md:col-end-4 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-rose-600`,
        false: `absolute right-1 top-1 z-50 h-8 w-8 rounded border border-solid border-zinc-700 bg-zinc-900/70 transition-colors hover:bg-rose-600 md:left-2 md:top-2 md:h-10 md:w-10 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100 dark:hover:bg-rose-600`,
    }
    if (details.isLoading)
        return (
            <Button disabled={true} className={dialogButtonStyles[isDialog]}>
                <LoaderCircle className={`h-4 w-4 animate-spin`} />
                {isDialog && <p>Loading...</p>}
            </Button>
        )
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    disabled={disabled}
                    className={dialogButtonStyles[isDialog]}
                    size={isDialog ? "default" : "icon"}
                >
                    <Minus className={isDialog ? `mr-2` : `h-4 w-4`} />
                    {isDialog && <p>Remove this item from the Board</p>}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Remove{" "}
                        <i>
                            {details.data.name
                                ? details.data.name
                                : details.data.title}
                        </i>{" "}
                        ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will remove the item
                        from the board for all users, as well as any rankings on
                        the item.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className={`h-8`}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction className={`h-8`} onClick={handleRemove}>
                        Remove
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
