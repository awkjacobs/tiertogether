import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"

import { useForm } from "react-hook-form"
import { TYPE_RETURN } from "@/lib/const"
import { LoaderCircle } from "lucide-react"
import { PRISMA_VIEW_NOTIFICATION } from "@prismaFuncs/prismaFuncs"

export default function StandardNotification({
    content,
    type,
    userViewed,
    notificationId,
}) {
    const form = useForm({})

    async function onSubmit() {
        await PRISMA_VIEW_NOTIFICATION(notificationId)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
                <Button
                    variant={"outline"}
                    type="submit"
                    className={`relative mx-2 my-1 h-fit flex-1 items-start justify-start p-0`}
                    disabled={userViewed}
                >
                    <div
                        className={`flex w-full flex-row items-center gap-2 p-4`}
                    >
                        {TYPE_RETURN[type].icon}
                        <p className={`col-start-2 col-end-3 text-wrap`}>
                            {content}
                        </p>
                    </div>
                    {form.formState.isSubmitting && (
                        <div
                            className={`absolute flex h-full w-full items-center justify-center bg-gradient-to-r from-transparent via-white/70 to-transparent dark:via-zinc-900/70`}
                        >
                            <LoaderCircle
                                className={`h-6 w-6 animate-spin text-purple-500`}
                            />
                        </div>
                    )}
                </Button>
            </form>
        </Form>
    )
}
