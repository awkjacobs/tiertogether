import { useMediaQuery } from "@app/hooks/use-media-query"

import { ToggleGroup } from "@components//ui/toggle-group"
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
import {
    BleachersIcon,
    DugoutIcon,
    SpecialIcon,
} from "@components/Utility/ExtraRowIcons"
import {
    ExtraRowTooltip,
    InfoPopover,
    InfoTooltip,
} from "../Dialogs/Dialog Modules/Dialog Components/RowTooltips"
import ToggleButton from "../ui/ToggleButton"

export default function EditBoardForm({ form, onSubmit, isOwner }) {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className={`flex min-w-96 flex-1 flex-col gap-6`}>
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
                                    {isDesktop && (
                                        <InfoTooltip
                                            side={"right"}
                                            component={<ExtraRowTooltip />}
                                        />
                                    )}
                                    {!isDesktop && (
                                        <InfoPopover
                                            component={<ExtraRowTooltip />}
                                        />
                                    )}
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
                    <div className="grid grid-cols-[auto,1fr] gap-x-2 space-y-2">
                        <FormLabel
                            className={`col-span-2 text-purple-800 dark:text-purple-400`}
                        >
                            Tier Labels
                        </FormLabel>

                        {form.getValues("tierOptions").includes("Special") && (
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
                                                disabled={!isOwner}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription hidden>
                                            Change the special tier name.
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
                                        Change the first tier name.
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
                                        Change the second tier name.
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
                                        Change the third tier name.
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
                                        Change the fourth tier name.
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
                                        Change the fifth tier name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {form.getValues("tierOptions").includes("Bleachers") && (
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
                                        Change the bleachers name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    {form.getValues("tierOptions").includes("Dugout") && (
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
    )
}
