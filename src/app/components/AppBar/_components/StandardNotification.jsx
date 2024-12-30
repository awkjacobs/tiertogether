import { Button } from "@components/ui/button"
import { Form } from "@components/ui/form"

import { PRISMA_VIEW_NOTIFICATION } from "@api/prismaFuncs"
import {
    NOTIFICATION_ICONS as NOTIFICATION_ICON,
    SIMPLIFIED_DATE,
} from "@lib/const"
import { LoaderCircle } from "lucide-react"
import { useForm } from "react-hook-form"

export default function StandardNotification({ notification, userViewed }) {
    const { content, type, id, createdAt } = notification
    const form = useForm({})

    async function onSubmit() {
        await PRISMA_VIEW_NOTIFICATION(id)
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
                        className={`flex w-full flex-row items-center gap-2 p-4 text-left`}
                    >
                        {NOTIFICATION_ICON[type]}
                        <h5
                            className={`col-start-2 col-end-3 flex-1 text-wrap`}
                        >
                            {content}
                        </h5>
                        <p className="self-start text-xs opacity-50">
                            {SIMPLIFIED_DATE(createdAt)}
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
