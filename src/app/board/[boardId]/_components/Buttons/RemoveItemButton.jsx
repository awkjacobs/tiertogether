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
import { DIALOG_BUTTON_STYLE } from "@lib/const"
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
