import { PRISMA_CREATE_NEW_BOARD } from "@api/prismaFuncs"
import { useMediaQuery } from "@app/hooks/use-media-query"
import { Button } from "@components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@components/ui/dialog"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@components/ui/drawer"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import { LoaderCircle } from "lucide-react"
import { useState } from "react"

import AddBoardForm from "@components/Forms/AddBoardForm"
import { Form } from "@components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z.object({
    boardName: z
        .string()
        .min(3, { message: "Board name must be at least 3 characters" }),
    boardType: z.string().min(1, { message: "Board type is required" }),
    tierOptions: z.array(z.string()).optional(),
    specialLabel: z
        .string()
        .min(1, { message: "Special tier label must be at least 1 character" }),
    tier1Label: z
        .string()
        .min(1, { message: "Tier 1 label must be at least 1 character" }),
    tier2Label: z
        .string()
        .min(1, { message: "Tier 2 label must be at least 1 character" }),
    tier3Label: z
        .string()
        .min(1, { message: "Tier 3 label must be at least 1 character" }),
    tier4Label: z
        .string()
        .min(1, { message: "Tier 4 label must be at least 1 character" }),
    tier5Label: z
        .string()
        .min(1, { message: "Tier 5 label must be at least 1 character" }),
    bleachersLabel: z
        .string()
        .min(1, { message: "Bleachers label must be at least 1 character" }),
    dugoutLabel: z
        .string()
        .min(1, { message: "Dugout label must be at least 1 character" }),
})

export default function AddBoardButton({ appData }) {
    const [isDialogOpen, setIsDialogOpen] = useState()

    const isDesktop = useMediaQuery("(min-width: 768px)")

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            boardName: "",
            boardType: "",
            tierOptions: [],
            specialLabel: "S",
            tier1Label: "A",
            tier2Label: "B",
            tier3Label: "C",
            tier4Label: "D",
            tier5Label: "F",
            bleachersLabel: "Bleachers",
            dugoutLabel: "Dugout",
        },
    })

    const onSubmit = async (values) => {
        values.ownerId = appData.user.id

        await PRISMA_CREATE_NEW_BOARD(values).finally(() => {
            toast(`${values.boardName} has been created`)
            form.reset()
            setIsDialogOpen(false)
        })
    }

    if (isDesktop) {
        return (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button
                        size="sm"
                        variant="outline"
                        className={`min-h-9 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600/50`}
                    >
                        New Board
                    </Button>
                </DialogTrigger>
                <DialogContent className={`max-w-screen-sm`}>
                    <DialogHeader>
                        <DialogTitle>New Board</DialogTitle>
                        <VisuallyHidden.Root>
                            <DialogDescription>
                                Create a new board
                            </DialogDescription>
                        </VisuallyHidden.Root>
                    </DialogHeader>
                    <AddBoardForm form={form} onSubmit={onSubmit} />
                    <DialogFooter>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <Button type="submit" size="sm">
                                    {form.formState.isSubmitting && (
                                        <LoaderCircle
                                            className={`h-4 w-4 animate-spin`}
                                        />
                                    )}
                                    {!form.formState.isSubmitting && "Create"}
                                </Button>
                            </form>
                        </Form>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }
    if (!isDesktop) {
        return (
            <Drawer open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DrawerTrigger asChild>
                    <Button
                        size="sm"
                        variant="outline"
                        className={`min-h-9 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600/50`}
                    >
                        New Board
                    </Button>
                </DrawerTrigger>
                <DrawerContent
                    className={`fixed bottom-0 h-[100svh] max-h-[100svh]`}
                >
                    <DrawerHeader className="text-left">
                        <DrawerTitle>Edit Board</DrawerTitle>
                        <VisuallyHidden.Root>
                            <DrawerDescription>Edit Board</DrawerDescription>
                        </VisuallyHidden.Root>
                    </DrawerHeader>
                    <AddBoardForm form={form} onSubmit={onSubmit} />
                    <DrawerFooter className="bottom-0 pt-2">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className={`flex`}
                            >
                                <Button type="submit" className={`flex-1`}>
                                    {form.formState.isSubmitting && (
                                        <LoaderCircle
                                            className={`h-4 w-4 animate-spin`}
                                        />
                                    )}
                                    {!form.formState.isSubmitting && "Create"}
                                </Button>
                            </form>
                        </Form>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
    }
}
