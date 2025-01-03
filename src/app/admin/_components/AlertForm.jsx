"use client"

import { Button } from "@components/ui/button"
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
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select"
import { Switch } from "@components/ui/switch"

import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { PRISMA_ADMIN_CREATE_ALERT } from "@api/prismaFuncs"

const formSchema = z.object({
    title: z.string().min(1, { message: "Alert title is required" }),
    content: z.string().min(1, { message: "Alert content is required" }),
    type: z.string(),
    active: z.boolean(),
})

export default function MyForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        values: {
            type: "warn",
            active: true,
        },
        defaultValues: {
            title: "",
            content: "",
            type: "warn",
            active: true,
        },
    })

    const onSubmit = async (values) => {
        await PRISMA_ADMIN_CREATE_ALERT(values).finally(() => {
            toast.success("Alert created successfully")
        })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid w-full grid-cols-[auto_1fr] gap-x-4 gap-y-2 rounded bg-zinc-950 p-4"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="col-span-full grid grid-cols-subgrid items-center justify-start space-y-0">
                            <FormLabel className={`col-start-1 col-end-2`}>
                                Title
                            </FormLabel>
                            <FormControl
                                placeholder="Alert Title"
                                className={`col-start-2 col-end-3`}
                            >
                                <Input {...field} />
                            </FormControl>
                            <FormDescription hidden>
                                Alert Title
                            </FormDescription>
                            <FormMessage className={`col-span-full`} />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem className="col-span-full grid grid-cols-subgrid items-center justify-start space-y-0">
                            <FormLabel className={`col-start-1 col-end-2`}>
                                Content
                            </FormLabel>
                            <FormControl
                                placeholder="Alert Content"
                                className={`col-start-2 col-end-3`}
                            >
                                <Input {...field} />
                            </FormControl>
                            <FormDescription hidden>
                                Alert Content
                            </FormDescription>
                            <FormMessage className={`col-span-full`} />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem className="col-span-full grid grid-cols-subgrid items-center justify-start space-y-0">
                            <FormLabel className={`col-start-1 col-end-2`}>
                                Type
                            </FormLabel>
                            <FormControl className={`col-start-2 col-end-3`}>
                                <Select
                                    {...field}
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="">
                                        <SelectValue value={field.value}>
                                            {field.value === "warn"
                                                ? "Warning"
                                                : "Info"}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent className="z-[9999]">
                                        <SelectGroup>
                                            <SelectItem
                                                value={"warn"}
                                                className="focus:bg-purple-600/50 dark:focus:bg-purple-600/50"
                                            >
                                                Warning
                                            </SelectItem>
                                            <SelectItem
                                                value={"info"}
                                                className="focus:bg-purple-600/50 dark:focus:bg-purple-600/50"
                                            >
                                                Info
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription hidden>
                                Alert Content
                            </FormDescription>
                            <FormMessage className={`col-span-full`} />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="active"
                    render={({ field }) => (
                        <FormItem className="col-span-full grid min-h-10 grid-cols-subgrid items-center justify-start space-y-0">
                            <FormLabel className={`col-start-1 col-end-2`}>
                                Active
                            </FormLabel>
                            <FormControl className={`col-start-2 col-end-3`}>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className={`dark:data-[state=checked]:bg-emerald-500`}
                                />
                            </FormControl>
                            <FormDescription hidden>
                                Alert Content
                            </FormDescription>
                            <FormMessage className={`col-span-full`} />
                        </FormItem>
                    )}
                />
                <div className="col-span-full flex items-center justify-end">
                    <Button type="submit" size="sm">
                        {form.formState.isSubmitting && (
                            <LoaderCircle className={`h-4 w-4 animate-spin`} />
                        )}
                        {!form.formState.isSubmitting && "Create New Alert"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
