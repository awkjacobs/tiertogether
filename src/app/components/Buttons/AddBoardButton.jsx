import { useMediaQuery } from "@/app/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { PRISMA_CREATE_NEW_BOARD } from "@prismaFuncs/prismaFuncs"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import { LoaderCircle } from "lucide-react"
import { useState } from "react"

import { ToggleGroup, ToggleGroupItem } from "@/components//ui/toggle-group"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import AnimeCross from "@/components/Utility/animeCross"
import { zodResolver } from "@hookform/resolvers/zod"
import { Clapperboard, Tv } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import {
    ExtraRowTooltip,
    InfoPopover,
    InfoTooltip,
} from "../Dialogs/Dialog Modules/Dialog Components/RowTooltips"
import ToggleButton from "../ui/ToggleButton"
import {
    BleachersIcon,
    DugoutIcon,
    SpecialIcon,
} from "../Utility/ExtraRowIcons"

const formSchema = z.object({
    boardName: z
        .string()
        .min(3, { message: "Board name must be at least 3 characters" }),
    boardType: z.string().min(1, { message: "Board type is required" }),
    tierOptions: z.array(z.string()).optional(),
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
            bleachersLabel: "Bleachers",
            dugoutLabel: "Dugout",
        },
    })

    const onSubmit = async (values) => {
        values.ownerId = appData.user.id

        console.log(values)
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
                <DialogContent className={`max-w-fit`}>
                    <DialogHeader>
                        <DialogTitle>New Board</DialogTitle>
                        <VisuallyHidden.Root>
                            <DialogDescription>
                                Create a new board
                            </DialogDescription>
                        </VisuallyHidden.Root>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <section
                                className={`flex w-full min-w-96 flex-col gap-4 border-b border-zinc-700 p-0 pb-4`}
                            >
                                <FormField
                                    control={form.control}
                                    name="boardName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                className={`text-purple-800 dark:text-purple-400`}
                                            >
                                                Board Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field} />
                                            </FormControl>
                                            <FormDescription hidden>
                                                Change the board name.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="boardType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                className={`flex flex-row gap-4 text-purple-800 dark:text-purple-400`}
                                            >
                                                Board Type
                                            </FormLabel>
                                            <FormControl>
                                                <ToggleGroup
                                                    type="single"
                                                    variant="outline"
                                                    groupColor="purple"
                                                    className={`items-start justify-start`}
                                                    {...field}
                                                    onValueChange={(value) =>
                                                        form.setValue(
                                                            "boardType",
                                                            value,
                                                            {
                                                                shouldDirty: true,
                                                                shouldValidate: true,
                                                            },
                                                        )
                                                    }
                                                >
                                                    <ToggleGroupItem
                                                        value="movie"
                                                        className={`flex-1 hover:bg-purple-600/50 dark:hover:bg-purple-600/50`}
                                                    >
                                                        <Clapperboard
                                                            className={`mr-4`}
                                                        />
                                                        Movie
                                                    </ToggleGroupItem>
                                                    <ToggleGroupItem
                                                        value="tv"
                                                        className={`flex-1 hover:bg-purple-600/50 dark:hover:bg-purple-600/50`}
                                                    >
                                                        <Tv
                                                            className={`mr-4`}
                                                        />
                                                        TV
                                                    </ToggleGroupItem>
                                                    <ToggleGroupItem
                                                        value="anime"
                                                        className={`flex-1 hover:bg-purple-600/50 dark:hover:bg-purple-600/50`}
                                                    >
                                                        <AnimeCross
                                                            className={`mr-4 h-6 w-6`}
                                                        />
                                                        Anime
                                                    </ToggleGroupItem>
                                                </ToggleGroup>
                                            </FormControl>
                                            <FormDescription hidden>
                                                Set the tier options.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="tierOptions"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                className={`flex flex-row gap-4 text-purple-800 dark:text-purple-400`}
                                            >
                                                Tier Options
                                                <InfoTooltip
                                                    side={"right"}
                                                    component={
                                                        <ExtraRowTooltip />
                                                    }
                                                />
                                            </FormLabel>
                                            <FormControl>
                                                <ToggleGroup
                                                    type="multiple"
                                                    variant="outline"
                                                    id="extraRows"
                                                    groupColor="purple"
                                                    className={`mt-2`}
                                                    {...field}
                                                    onValueChange={(value) =>
                                                        form.setValue(
                                                            "tierOptions",
                                                            value,
                                                            {
                                                                shouldDirty: true,
                                                                shouldValidate: true,
                                                            },
                                                        )
                                                    }
                                                >
                                                    <ToggleButton
                                                        value={"Special"}
                                                        icon={<SpecialIcon />}
                                                        className={`hover:bg-purple-600/50 dark:hover:bg-purple-600/50`}
                                                    />
                                                    <ToggleButton
                                                        value={"Bleachers"}
                                                        icon={<BleachersIcon />}
                                                        className={`hover:bg-purple-600/50 dark:hover:bg-purple-600/50`}
                                                    />
                                                    <ToggleButton
                                                        value={"Dugout"}
                                                        icon={<DugoutIcon />}
                                                        className={`hover:bg-purple-600/50 dark:hover:bg-purple-600/50`}
                                                    />
                                                </ToggleGroup>
                                            </FormControl>
                                            <FormDescription hidden>
                                                Set the tier options.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {form
                                    .getValues("tierOptions")
                                    .includes("Bleachers") && (
                                    <FormField
                                        control={form.control}
                                        name="bleachersLabel"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel
                                                    className={`text-purple-800 dark:text-purple-400`}
                                                >
                                                    Bleachers Label
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription hidden>
                                                    Change the bleachers name.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                                {form
                                    .getValues("tierOptions")
                                    .includes("Dugout") && (
                                    <FormField
                                        control={form.control}
                                        name="dugoutLabel"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel
                                                    className={`text-purple-800 dark:text-purple-400`}
                                                >
                                                    Dugout Label
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription hidden>
                                                    Change the dugout name.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </section>
                        </form>
                    </Form>
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

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="overflow-y-scroll"
                        >
                            <section
                                className={`flex w-full min-w-80 flex-col gap-4 p-4`}
                            >
                                <FormField
                                    control={form.control}
                                    name="boardName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                className={`text-purple-800 dark:text-purple-400`}
                                            >
                                                Board Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field} />
                                            </FormControl>
                                            <FormDescription hidden>
                                                Change the board name.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="boardType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                className={`flex flex-row gap-4 text-purple-800 dark:text-purple-400`}
                                            >
                                                Board Type
                                            </FormLabel>
                                            <FormControl>
                                                <ToggleGroup
                                                    type="single"
                                                    variant="outline"
                                                    groupColor="purple"
                                                    className={`items-start justify-start`}
                                                    {...field}
                                                    onValueChange={(value) =>
                                                        form.setValue(
                                                            "boardType",
                                                            value,
                                                            {
                                                                shouldDirty: true,
                                                                shouldValidate: true,
                                                            },
                                                        )
                                                    }
                                                >
                                                    <ToggleGroupItem
                                                        value="movie"
                                                        className={`flex-1 hover:bg-purple-600/50 dark:hover:bg-purple-600/50`}
                                                    >
                                                        <Clapperboard
                                                            className={`mr-4`}
                                                        />
                                                        Movie
                                                    </ToggleGroupItem>
                                                    <ToggleGroupItem
                                                        value="tv"
                                                        className={`flex-1 hover:bg-purple-600/50 dark:hover:bg-purple-600/50`}
                                                    >
                                                        <Tv
                                                            className={`mr-4`}
                                                        />
                                                        TV
                                                    </ToggleGroupItem>
                                                    <ToggleGroupItem
                                                        value="anime"
                                                        className={`flex-1 hover:bg-purple-600/50 dark:hover:bg-purple-600/50`}
                                                    >
                                                        <AnimeCross
                                                            className={`mr-4 h-6 w-6`}
                                                        />
                                                        Anime
                                                    </ToggleGroupItem>
                                                </ToggleGroup>
                                            </FormControl>
                                            <FormDescription hidden>
                                                Set the tier options.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="tierOptions"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                className={`flex flex-row gap-4 text-purple-800 dark:text-purple-400`}
                                            >
                                                Tier Options
                                                <InfoPopover
                                                    component={
                                                        <ExtraRowTooltip />
                                                    }
                                                />
                                            </FormLabel>
                                            <FormControl>
                                                <ToggleGroup
                                                    type="multiple"
                                                    variant="outline"
                                                    id="extraRows"
                                                    groupColor="purple"
                                                    className={`mt-2`}
                                                    {...field}
                                                    onValueChange={(value) =>
                                                        form.setValue(
                                                            "tierOptions",
                                                            value,
                                                            {
                                                                shouldDirty: true,
                                                                shouldValidate: true,
                                                            },
                                                        )
                                                    }
                                                >
                                                    <ToggleButton
                                                        value={"Special"}
                                                        icon={<SpecialIcon />}
                                                        className={`hover:bg-purple-600/50 dark:hover:bg-purple-600/50`}
                                                    />
                                                    <ToggleButton
                                                        value={"Bleachers"}
                                                        icon={<BleachersIcon />}
                                                        className={`hover:bg-purple-600/50 dark:hover:bg-purple-600/50`}
                                                    />
                                                    <ToggleButton
                                                        value={"Dugout"}
                                                        icon={<DugoutIcon />}
                                                        className={`hover:bg-purple-600/50 dark:hover:bg-purple-600/50`}
                                                    />
                                                </ToggleGroup>
                                            </FormControl>
                                            <FormDescription hidden>
                                                Set the tier options.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {form
                                    .getValues("tierOptions")
                                    .includes("Bleachers") && (
                                    <FormField
                                        control={form.control}
                                        name="bleachersLabel"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel
                                                    className={`text-purple-800 dark:text-purple-400`}
                                                >
                                                    Bleachers Label
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription hidden>
                                                    Change the bleachers name.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                                {form
                                    .getValues("tierOptions")
                                    .includes("Dugout") && (
                                    <FormField
                                        control={form.control}
                                        name="dugoutLabel"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel
                                                    className={`text-purple-800 dark:text-purple-400`}
                                                >
                                                    Dugout Label
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription hidden>
                                                    Change the dugout name.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </section>
                        </form>
                    </Form>

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
