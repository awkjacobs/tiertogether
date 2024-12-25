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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs"
import { cn } from "@lib/utils"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import { EllipsisVertical, LoaderCircle } from "lucide-react"
import { useState } from "react"

import { ToggleGroup, ToggleGroupItem } from "@components//ui/toggle-group"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@components/ui/form"
import { Input } from "@components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { PRISMA_UPDATE_BOARD } from "@api/prismaFuncs"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import {
    DeleteBoardButton,
    LeaveBoardButton,
} from "../Dialogs/Dialog Actions/EditDialogActionComponents"
import BoardUsersArea from "../Dialogs/Dialog Modules/Dialog Components/BoardUsersArea"
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

export default function EditBoardButton({
    triggerClasses,
    iconClasses,
    appData,
    board,
    isOwner = false,
}) {
    const [isDialogOpen, setIsDialogOpen] = useState()
    const tierLabels = JSON.parse(board.tierLabels)

    const isDesktop = useMediaQuery("(min-width: 768px)")

    const boardRowOptions = () => {
        let options = []
        if (board?.special) options.push("Special")
        if (board?.bleachers) options.push("Bleachers")
        if (board?.dugout) options.push("Dugout")
        return options
    }

    const form = useForm({
        resolver: zodResolver(formSchema),
        values: {
            boardName: board.boardName,
            specialLabel: tierLabels[0],
            tier1Label: tierLabels[1],
            tier2Label: tierLabels[2],
            tier3Label: tierLabels[3],
            tier4Label: tierLabels[4],
            tier5Label: tierLabels[5],
            bleachersLabel: board.bleachersLabel,
            dugoutLabel: board.dugoutLabel,
            tierOptions: boardRowOptions(),
        },
        defaultValues: {
            tierOptions: boardRowOptions(),
        },
    })

    const onSubmit = async (values) => {
        console.log(values)
        await PRISMA_UPDATE_BOARD(board.id, values).finally(() => {
            toast(`${board.boardName} has been updated`)
            setIsDialogOpen(false)
        })
    }

    if (isDesktop) {
        return (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        className={triggerClasses ? `${triggerClasses}` : ""}
                    >
                        <EllipsisVertical
                            className={cn(
                                `text-purple-700 dark:text-purple-200`,
                                iconClasses,
                            )}
                        />
                    </Button>
                </DialogTrigger>
                <DialogContent
                    onOpenAutoFocus={(event) => {
                        event.preventDefault()
                    }}
                    className={`max-w-fit`}
                >
                    <DialogHeader>
                        <DialogTitle>Edit Board</DialogTitle>
                        <VisuallyHidden.Root>
                            <DialogDescription>Edit Board</DialogDescription>
                        </VisuallyHidden.Root>
                    </DialogHeader>
                    <section
                        className={`flex w-full flex-row gap-8 border-b border-zinc-700 p-0 pb-4`}
                    >
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
                                <div
                                    className={`flex min-w-96 flex-1 flex-col gap-4`}
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
                                                    <Input
                                                        type="text"
                                                        disabled={!isOwner}
                                                        {...field}
                                                    />
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
                                                        disabled={!isOwner}
                                                        {...field}
                                                        onValueChange={(
                                                            value,
                                                        ) =>
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
                                                            icon={
                                                                <SpecialIcon />
                                                            }
                                                            className={`hover:bg-purple-600/50 dark:hover:bg-purple-600/50`}
                                                        />
                                                        <ToggleButton
                                                            value={"Bleachers"}
                                                            icon={
                                                                <BleachersIcon />
                                                            }
                                                            className={`hover:bg-purple-600/50 dark:hover:bg-purple-600/50`}
                                                        />
                                                        <ToggleButton
                                                            value={"Dugout"}
                                                            icon={
                                                                <DugoutIcon />
                                                            }
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
                                    <div className="grid grid-cols-[auto,1fr] gap-x-2 space-y-2">
                                        <FormLabel
                                            className={`col-span-2 text-purple-800 dark:text-purple-400`}
                                        >
                                            Tier Labels
                                        </FormLabel>

                                        {form
                                            .getValues("tierOptions")
                                            .includes("Special") && (
                                            <FormField
                                                control={form.control}
                                                name="specialLabel"
                                                render={({ field }) => (
                                                    <FormItem
                                                        className={`col-span-2 grid grid-cols-subgrid items-center space-y-0`}
                                                    >
                                                        <FormLabel
                                                            className={`col-start-1 col-end-2 whitespace-nowrap`}
                                                        >
                                                            Special
                                                        </FormLabel>
                                                        <FormControl
                                                            className={`col-start-2 col-end-3`}
                                                        >
                                                            <Input
                                                                type="text"
                                                                disabled={
                                                                    !isOwner
                                                                }
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormDescription hidden>
                                                            Change the special
                                                            tier name.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )}
                                        <FormField
                                            control={form.control}
                                            name="tier1Label"
                                            render={({ field }) => (
                                                <FormItem
                                                    className={`col-span-2 grid grid-cols-subgrid items-center space-y-0`}
                                                >
                                                    <FormLabel
                                                        className={`col-start-1 col-end-2 whitespace-nowrap`}
                                                    >
                                                        Tier 1
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            disabled={!isOwner}
                                                            className={`col-start-2 col-end-3`}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription hidden>
                                                        Change the first tier
                                                        name.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="tier2Label"
                                            render={({ field }) => (
                                                <FormItem
                                                    className={`col-span-2 grid grid-cols-subgrid items-center space-y-0`}
                                                >
                                                    <FormLabel
                                                        className={`col-start-1 col-end-2 whitespace-nowrap`}
                                                    >
                                                        Tier 2
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            disabled={!isOwner}
                                                            className={`col-start-2 col-end-3`}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription hidden>
                                                        Change the second tier
                                                        name.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="tier3Label"
                                            render={({ field }) => (
                                                <FormItem
                                                    className={`col-span-2 grid grid-cols-subgrid items-center space-y-0`}
                                                >
                                                    <FormLabel
                                                        className={`col-start-1 col-end-2 whitespace-nowrap`}
                                                    >
                                                        Tier 3
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            disabled={!isOwner}
                                                            className={`col-start-2 col-end-3`}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription hidden>
                                                        Change the third tier
                                                        name.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="tier4Label"
                                            render={({ field }) => (
                                                <FormItem
                                                    className={`col-span-2 grid grid-cols-subgrid items-center space-y-0`}
                                                >
                                                    <FormLabel
                                                        className={`col-start-1 col-end-2 whitespace-nowrap`}
                                                    >
                                                        Tier 4
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            disabled={!isOwner}
                                                            className={`col-start-2 col-end-3`}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription hidden>
                                                        Change the fourth tier
                                                        name.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="tier5Label"
                                            render={({ field }) => (
                                                <FormItem
                                                    className={`col-span-2 grid grid-cols-subgrid items-center space-y-0`}
                                                >
                                                    <FormLabel
                                                        className={`col-start-1 col-end-2 whitespace-nowrap`}
                                                    >
                                                        Tier 5
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            disabled={!isOwner}
                                                            className={`col-start-2 col-end-3`}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription hidden>
                                                        Change the fifth tier
                                                        name.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
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
                                                            disabled={!isOwner}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription hidden>
                                                        Change the bleachers
                                                        name.
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
                                                            disabled={!isOwner}
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
                                </div>
                            </form>
                        </Form>

                        <div className={`flex`}>
                            <BoardUsersArea board={board} />
                        </div>
                    </section>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <DialogFooter>
                                <DeleteBoardButton
                                    board={board}
                                    isOwner={isOwner}
                                    setIsDialogOpen={setIsDialogOpen}
                                />
                                <LeaveBoardButton
                                    board={board}
                                    isOwner={isOwner}
                                    appData={appData}
                                    setIsDialogOpen={setIsDialogOpen}
                                />
                                <div style={{ flex: 1 }} />
                                <Button type="submit" size="sm">
                                    {form.formState.isSubmitting && (
                                        <LoaderCircle
                                            className={`h-4 w-4 animate-spin`}
                                        />
                                    )}
                                    {!form.formState.isSubmitting && "Save"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        )
    }
    if (!isDesktop) {
        return (
            <Drawer open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DrawerTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        className={triggerClasses}
                    >
                        <EllipsisVertical
                            className={cn(
                                `text-purple-700 dark:text-purple-200`,
                                iconClasses,
                            )}
                        />
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
                    <section
                        className={`grid-cols-auto relative z-10 grid h-full flex-1 grid-rows-[auto,1fr] gap-4 overflow-hidden p-4 pt-0`}
                    >
                        <Tabs
                            defaultValue="users"
                            className={`row-span-3 row-start-1 row-end-3 grid grid-cols-subgrid grid-rows-subgrid overflow-hidden`}
                        >
                            <TabsList
                                className={`row-start-1 row-end-2 h-full w-full bg-zinc-200 dark:bg-zinc-900`}
                            >
                                <TabsTrigger
                                    value="users"
                                    className={`w-full rounded data-[state=active]:bg-purple-600 data-[state=active]:text-purple-100 dark:data-[state=active]:bg-purple-800`}
                                >
                                    Board Users
                                </TabsTrigger>
                                <TabsTrigger
                                    value="options"
                                    className={`w-full rounded data-[state=active]:bg-purple-600 data-[state=active]:text-purple-100 dark:data-[state=active]:bg-purple-800`}
                                >
                                    Board Options
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent
                                value="options"
                                className={`row-start-2 row-end-3 grid h-full grid-rows-subgrid content-start overflow-y-scroll data-[state="inactive"]:hidden`}
                            >
                                <div
                                    className={`flex flex-col gap-4 overflow-y-scroll p-1`}
                                >
                                    <Form {...form}>
                                        <form
                                            onSubmit={form.handleSubmit(
                                                onSubmit,
                                            )}
                                            className="space-y-6"
                                        >
                                            <FormField
                                                control={form.control}
                                                name="boardName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel
                                                            className={`flextext-purple-800 dark:text-purple-400`}
                                                        >
                                                            Board Name
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="text"
                                                                disabled={
                                                                    !isOwner
                                                                }
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormDescription hidden>
                                                            Change the board
                                                            name.
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
                                                                disabled={
                                                                    !isOwner
                                                                }
                                                                {...field}
                                                                onValueChange={(
                                                                    value,
                                                                ) =>
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
                                                                    value={
                                                                        "Special"
                                                                    }
                                                                    icon={
                                                                        <SpecialIcon />
                                                                    }
                                                                    className={`hover:bg-purple-600/50 dark:hover:bg-purple-600/50`}
                                                                />
                                                                <ToggleButton
                                                                    value={
                                                                        "Bleachers"
                                                                    }
                                                                    icon={
                                                                        <BleachersIcon />
                                                                    }
                                                                    className={`hover:bg-purple-600/50 dark:hover:bg-purple-600/50`}
                                                                />
                                                                <ToggleButton
                                                                    value={
                                                                        "Dugout"
                                                                    }
                                                                    icon={
                                                                        <DugoutIcon />
                                                                    }
                                                                    className={`hover:bg-purple-600/50 dark:hover:bg-purple-600/50`}
                                                                />
                                                            </ToggleGroup>
                                                        </FormControl>
                                                        <FormDescription hidden>
                                                            Set the tier
                                                            options.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <div className="grid grid-cols-[auto,1fr] gap-x-2 space-y-2">
                                                <FormLabel
                                                    className={`col-span-2 text-purple-800 dark:text-purple-400`}
                                                >
                                                    Tier Labels
                                                </FormLabel>

                                                {form
                                                    .getValues("tierOptions")
                                                    .includes("Special") && (
                                                    <FormField
                                                        control={form.control}
                                                        name="specialLabel"
                                                        render={({ field }) => (
                                                            <FormItem
                                                                className={`col-span-2 grid grid-cols-subgrid items-center space-y-0`}
                                                            >
                                                                <FormLabel
                                                                    className={`col-start-1 col-end-2 whitespace-nowrap`}
                                                                >
                                                                    Special
                                                                </FormLabel>
                                                                <FormControl
                                                                    className={`col-start-2 col-end-3`}
                                                                >
                                                                    <Input
                                                                        type="text"
                                                                        disabled={
                                                                            !isOwner
                                                                        }
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormDescription
                                                                    hidden
                                                                >
                                                                    Change the
                                                                    special tier
                                                                    name.
                                                                </FormDescription>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                )}
                                                <FormField
                                                    control={form.control}
                                                    name="tier1Label"
                                                    render={({ field }) => (
                                                        <FormItem
                                                            className={`col-span-2 grid grid-cols-subgrid items-center space-y-0`}
                                                        >
                                                            <FormLabel
                                                                className={`col-start-1 col-end-2 whitespace-nowrap`}
                                                            >
                                                                Tier 1
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="text"
                                                                    disabled={
                                                                        !isOwner
                                                                    }
                                                                    className={`col-start-2 col-end-3`}
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormDescription
                                                                hidden
                                                            >
                                                                Change the first
                                                                tier name.
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="tier2Label"
                                                    render={({ field }) => (
                                                        <FormItem
                                                            className={`col-span-2 grid grid-cols-subgrid items-center space-y-0`}
                                                        >
                                                            <FormLabel
                                                                className={`col-start-1 col-end-2 whitespace-nowrap`}
                                                            >
                                                                Tier 2
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="text"
                                                                    disabled={
                                                                        !isOwner
                                                                    }
                                                                    className={`col-start-2 col-end-3`}
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormDescription
                                                                hidden
                                                            >
                                                                Change the
                                                                second tier
                                                                name.
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="tier3Label"
                                                    render={({ field }) => (
                                                        <FormItem
                                                            className={`col-span-2 grid grid-cols-subgrid items-center space-y-0`}
                                                        >
                                                            <FormLabel
                                                                className={`col-start-1 col-end-2 whitespace-nowrap`}
                                                            >
                                                                Tier 3
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="text"
                                                                    disabled={
                                                                        !isOwner
                                                                    }
                                                                    className={`col-start-2 col-end-3`}
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormDescription
                                                                hidden
                                                            >
                                                                Change the third
                                                                tier name.
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="tier4Label"
                                                    render={({ field }) => (
                                                        <FormItem
                                                            className={`col-span-2 grid grid-cols-subgrid items-center space-y-0`}
                                                        >
                                                            <FormLabel
                                                                className={`col-start-1 col-end-2 whitespace-nowrap`}
                                                            >
                                                                Tier 4
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="text"
                                                                    disabled={
                                                                        !isOwner
                                                                    }
                                                                    className={`col-start-2 col-end-3`}
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormDescription
                                                                hidden
                                                            >
                                                                Change the
                                                                fourth tier
                                                                name.
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="tier5Label"
                                                    render={({ field }) => (
                                                        <FormItem
                                                            className={`col-span-2 grid grid-cols-subgrid items-center space-y-0`}
                                                        >
                                                            <FormLabel
                                                                className={`col-start-1 col-end-2 whitespace-nowrap`}
                                                            >
                                                                Tier 5
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="text"
                                                                    disabled={
                                                                        !isOwner
                                                                    }
                                                                    className={`col-start-2 col-end-3`}
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormDescription
                                                                hidden
                                                            >
                                                                Change the fifth
                                                                tier name.
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            {form
                                                .getValues("tierOptions")
                                                .includes("Bleachers") && (
                                                <FormField
                                                    control={form.control}
                                                    name="bleachersLabel"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel
                                                                className={`flex text-purple-800 dark:text-purple-400`}
                                                            >
                                                                Bleachers Label
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="text"
                                                                    disabled={
                                                                        !isOwner
                                                                    }
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormDescription
                                                                hidden
                                                            >
                                                                Change the
                                                                bleachers name.
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
                                                                className={`flex text-purple-800 dark:text-purple-400`}
                                                            >
                                                                Dugout Label
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="text"
                                                                    disabled={
                                                                        !isOwner
                                                                    }
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormDescription
                                                                hidden
                                                            >
                                                                Change the
                                                                dugout name.
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            )}
                                        </form>
                                    </Form>
                                </div>
                            </TabsContent>
                            <TabsContent
                                value="users"
                                className={`row-start-2 row-end-3 grid grid-rows-subgrid overflow-hidden data-[state="inactive"]:hidden`}
                            >
                                <div
                                    className={`row-start-1 row-end-2 grid grid-rows-subgrid gap-4 overflow-hidden`}
                                >
                                    <BoardUsersArea board={board} />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </section>

                    <DrawerFooter className="bottom-0 gap-4 pt-2">
                        <div className={`flex flex-row gap-2`}>
                            <DeleteBoardButton
                                board={appData?.board ? appData.board : board}
                                isOwner={isOwner}
                                setIsDialogOpen={setIsDialogOpen}
                                className={`flex-1`}
                            />
                            <LeaveBoardButton
                                board={appData?.board ? appData.board : board}
                                isOwner={isOwner}
                                appData={appData}
                                setIsDialogOpen={setIsDialogOpen}
                                className={`flex-1`}
                            />
                        </div>

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className={`flex`}
                            >
                                <Button
                                    type="submit"
                                    size="sm"
                                    className={`flex-1`}
                                >
                                    {form.formState.isSubmitting && (
                                        <LoaderCircle
                                            className={`h-4 w-4 animate-spin`}
                                        />
                                    )}
                                    {!form.formState.isSubmitting && "Save"}
                                </Button>
                            </form>
                        </Form>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
    }
}
