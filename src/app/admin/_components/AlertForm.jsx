"use client"
import { useState } from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { cn } from "@lib/utils"
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
import { Textarea } from "@components/ui/textarea"
import { LoaderCircle } from "lucide-react"

const formSchema = z.object({
    title: z.string().min(1, { message: "Alert title is required" }),
    content: z.string().min(1, { message: "Alert content is required" }),
})

export default function MyForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    })

    function onSubmit(values) {
        try {
            console.log(values)
            toast(
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(values, null, 2)}
                    </code>
                </pre>,
            )
        } catch (error) {
            console.error("Form submission error", error)
            toast.error("Failed to submit the form. Please try again.")
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-4 py-4"
            >
                <h3 className="text-lg font-bold">Alert Form</h3>
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Alert Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Alert Title" {...field} />
                            </FormControl>
                            <FormDescription hidden>
                                Alert Title
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Alert Content</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Placeholder"
                                    className="h-48 resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription hidden>
                                Alert Content
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" size="sm">
                    {form.formState.isSubmitting && (
                        <LoaderCircle className={`h-4 w-4 animate-spin`} />
                    )}
                    {!form.formState.isSubmitting && "Send Alert"}
                </Button>
            </form>
        </Form>
    )
}
