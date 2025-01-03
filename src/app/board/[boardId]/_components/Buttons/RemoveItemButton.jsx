import { PRISMA_DELETE_ITEM } from "@api/prismaFuncs"
import { AppDataContext } from "@app/components/_providers/appDataProvider"
import { Button } from "@app/components/ui/button"
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
} from "@components/ui/alert-dialog"
import { Form } from "@components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle, Minus } from "lucide-react"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z.object({})

export default function RemoveItemButton({ item, name, disabled, isDialog }) {
    const { appData } = useContext(AppDataContext)

    const form = useForm({
        resolver: zodResolver(formSchema),
    })

    async function handleRemove() {
        let content = `${name} removed from ${appData.board.boardName}`
        await PRISMA_DELETE_ITEM(
            appData.board,
            item,
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
    const DIALOG_BUTTON_STYLE = {
        true: `col-start-1 mx-auto flex flex-row items-center place-self-end transition-colors hover:bg-rose-600 md:col-end-4 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-rose-600`,
        false: `absolute right-1 top-1 z-50 h-8 w-8 rounded border border-solid border-zinc-700 bg-zinc-200/50 transition-colors hover:text-zinc-100 hover:bg-rose-600 md:left-2 md:top-2 md:h-10 md:w-10 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100 text-zinc-700 dark:hover:bg-rose-600`,
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    disabled={disabled}
                    className={DIALOG_BUTTON_STYLE[isDialog]}
                    size={isDialog ? "default" : "icon"}
                >
                    <Minus className={isDialog ? `mr-2` : `h-4 w-4`} />
                    {isDialog && <p>Remove this item from the Board</p>}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Remove <i>{name}</i> ?
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
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleRemove)}
                            className={`inline-flex flex-col`}
                        >
                            <AlertDialogAction
                                className={`h-8 flex-1`}
                                type="submit"
                            >
                                {form.formState.isSubmitting && (
                                    <LoaderCircle className="animate-spin" />
                                )}
                                {!form.formState.isSubmitting && "Remove"}
                            </AlertDialogAction>
                        </form>
                    </Form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
