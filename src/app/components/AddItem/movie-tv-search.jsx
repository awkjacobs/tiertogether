"'use client'"
import { useMediaQuery } from "@/app/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoaderCircle, Search, X } from "lucide-react"
import { useEffect, useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { queryTypesList } from "@/lib/const"
import { searchSwitch } from "./searchSwitch"

const formSchema = z.object({
    query: z.string().min(1, { message: "Query cannot be empty" }),
    queryType: z.string().optional(),
    page: z.number(),
})

export default function MovieTvSearch({
    setQueryResults,
    setLoading,
    clearResults,
    type,
    queryType,
    pageCount,
    setPageCount,
    currentPage,
    setCurrentPage,
    setQueryType,
}) {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const [selectValue, setSelectValue] = useState(queryTypesList(type)[0])

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            query: "",
            queryType: queryTypesList(type)[0],
            page: 1,
        },
    })

    useEffect(() => {
        if (form.getValues("query") === "") clearResults()
    }, [form.getValues("query")])

    const onSubmit = async (values) => {
        console.log(values)
        let pageCount
        const res = await searchSwitch(type, values.queryType, values.query)
        setQueryResults(res)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full flex-row space-x-2 md:p-1"
            >
                <FormField
                    control={form.control}
                    name="queryType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel hidden className={`hidden`}>
                                Search Type
                            </FormLabel>
                            <Select
                                {...field}
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                onOpenChange={() => setSelectValue(field.value)}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-32">
                                        <SelectValue value={field.value}>
                                            {field.value}
                                        </SelectValue>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {queryTypesList(type).map((queryType) => (
                                        <SelectItem
                                            key={queryType}
                                            value={queryType}
                                        >
                                            {queryType}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription hidden>
                                Change the search type.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="query"
                    render={({ field }) => (
                        <FormItem className={`flex-1`}>
                            <FormLabel hidden>Search Field</FormLabel>
                            <FormControl>
                                <Input
                                    autoFocus
                                    type="search"
                                    placeholder={`Search for ${selectValue}...`}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription hidden>
                                Search for a {selectValue}.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">
                    {form.formState.isSubmitting && (
                        <LoaderCircle
                            className={`h-4 w-4 animate-spin md:mr-2`}
                        />
                    )}
                    {!form.formState.isSubmitting && (
                        <Search className="h-4 w-4 md:mr-2" />
                    )}

                    {isDesktop && "Search"}
                </Button>
            </form>
        </Form>
    )
}
