import { PRISMA_ADD_ITEM } from "@api/prismaFuncs"
import { AppDataContext } from "@app/components/_providers/appDataProvider"
import { Button } from "@app/components/ui/button"
import { useGetDetailsQuery } from "@app/hooks/use-get-fetch-query"
import { Form } from "@components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle, Plus } from "lucide-react"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z.object({})

export default function AddItemButton({ item, disabled }) {
    const { appData } = useContext(AppDataContext)
    const { board } = appData
    const details = useGetDetailsQuery(item.id, item.type)

    const name = details?.data?.name
        ? details?.data?.name
        : details?.data?.title

    const form = useForm({
        resolver: zodResolver(formSchema),
    })

    async function handleAdd() {
        let content = `${name} added to ${board.boardName}`

        let runFinally = true

        await PRISMA_ADD_ITEM(
            board,
            {
                id: item.id,
                backdrop_path: item?.backdrop_path
                    ? item.backdrop_path
                    : details.data?.artworks[0]?.image_id,
                type: item.type,
            },
            content,
            "itemAdded",
        )
            .catch((err) => {
                if (err) {
                    runFinally = false

                    console.error(err)
                }
            })
            .finally(() => {
                if (!runFinally) return

                toast(content, {
                    action: {
                        label: "Close",
                        onClick: () => null,
                    },
                })
            })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleAdd)}
                className={`flex justify-center`}
            >
                <Button
                    disabled={disabled}
                    className={`transition-colors hover:bg-emerald-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-emerald-600`}
                    size={"default"}
                    type="submit"
                >
                    {form.formState.isSubmitting && (
                        <>
                            <LoaderCircle className="mr-2 animate-spin" />
                            <p>Adding to Board</p>
                        </>
                    )}
                    {!form.formState.isSubmitting && (
                        <>
                            <Plus className={`mr-2`} />
                            <p>Add this Item to the Board</p>
                        </>
                    )}
                </Button>
            </form>
        </Form>
    )
}
