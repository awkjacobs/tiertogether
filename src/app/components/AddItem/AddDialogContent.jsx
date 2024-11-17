import { useMediaQuery } from "@/app/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useVirtualizer } from "@tanstack/react-virtual"
import { LoaderCircle, Search } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import SearchCard from "./SearchCard"

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
import { LoadingSpinner } from "../ui/LoadingSpinner"

const formSchema = z.object({
    query: z.string().min(1, { message: "Query cannot be empty" }),
    queryType: z.string().optional(),
    page: z.number(),
})

// TODO - add more search options
// TODO - figure out how to add pages as you go

export default function AddDialogContent({ appData, board }) {
    const type = board.type

    // const [queryType, setQueryType] = useState(
    //     type == "movie" ? "Title" : "Series",
    // )

    const [queryResults, setQueryResults] = useState([])
    const [pageCount, setPageCount] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false)

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

    const clearResults = () => {
        setLoading(false)
        setQueryResults([])
    }

    const parentRef = useRef()
    const rowVirtualizer = useVirtualizer({
        count:
            queryResults.length <= 20 ? queryResults.length : currentPage * 20,
        getScrollElement: () => parentRef.current,
        estimateSize: () => (isDesktop ? 240 : 96),
        overscan: isDesktop ? 3 : 7,
        gap: 16,
        enabled: !form.formState.isSubmitting,
    })

    return (
        <section
            className={`flex h-full flex-1 flex-col items-start overflow-y-hidden p-4 md:overflow-x-visible md:p-0`}
        >
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
                                    onOpenChange={() =>
                                        setSelectValue(field.value)
                                    }
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-24 md:w-32">
                                            <SelectValue value={field.value}>
                                                {field.value}
                                            </SelectValue>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {queryTypesList(type).map(
                                            (queryType) => (
                                                <SelectItem
                                                    key={queryType}
                                                    value={queryType}
                                                >
                                                    {queryType}
                                                </SelectItem>
                                            ),
                                        )}
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

                        {isDesktop && !form.formState.isSubmitting && "Search"}
                        {isDesktop &&
                            form.formState.isSubmitting &&
                            "Searching"}
                    </Button>
                </form>
            </Form>
            {form.formState.isSubmitting && (
                <div
                    className={`flex w-full flex-1 items-center justify-center md:min-h-32`}
                >
                    <LoadingSpinner size={96} className={`text-purple-500`} />
                </div>
            )}
            {!form.formState.isSubmitting && (
                <div
                    ref={parentRef}
                    className={`mt-4 h-full max-h-[1024px] w-full ${loading ? "flex-grow-0" : "flex-1"} justify-start overflow-y-scroll`}
                    type="always"
                >
                    <div
                        style={{
                            height: `${rowVirtualizer.getTotalSize()}px`,
                            width: "100%",
                            position: "relative",
                        }}
                    >
                        {rowVirtualizer.getVirtualItems().map((virtualItem) => (
                            <SearchCard
                                type={type}
                                queryType={form.getValues("queryType")}
                                key={virtualItem.index}
                                user={appData.user}
                                item={queryResults[virtualItem.index]}
                                board={board}
                                virtualizedStyles={virtualItem.start}
                                style={{
                                    transform: `translateY(${virtualItem.start}px)`,
                                }}
                            />
                        ))}
                    </div>
                    {currentPage < pageCount && (
                        <Button
                            variant="ghost"
                            className={`float-end my-2`}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next Page
                        </Button>
                    )}
                </div>
            )}
        </section>
    )
}
