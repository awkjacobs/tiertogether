import { useMediaQuery } from "@/app/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useVirtualizer } from "@tanstack/react-virtual"
import { LoaderCircle, Search } from "lucide-react"
import { useContext, useEffect, useRef, useState } from "react"
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

import { AppDataContext } from "@/app/components/_providers/appDataProvider"
import { useGetSearchQuery } from "@/app/hooks/use-get-fetch-query"
import { queryTypesList } from "@lib/const"
import { useMutation } from "@tanstack/react-query"
import { LoadingSpinner } from "../../../../components/ui/LoadingSpinner"

const formSchema = z.object({
    query: z.string().min(1, { message: "Query cannot be empty" }),
    queryType: z.string().optional(),
    page: z.number(),
})

// TODO - add more search options

export default function AddDialogContent() {
    const { appData } = useContext(AppDataContext)
    const { board } = appData
    const type = board.type
    const [queryValues, setQueryValues] = useState({
        type: type,
        queryType: queryTypesList(type)[0],
        query: "",
    })
    const [currentPage, setCurrentPage] = useState(1)

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
        if (form.getValues("query") === "")
            mutate({
                type: type,
                queryType: queryTypesList(type)[0],
                query: "",
            })
    }, [form.getValues("query")])

    const queryResults = useGetSearchQuery(
        queryValues.type,
        queryValues.queryType,
        queryValues.query,
        currentPage,
    )
    useEffect(() => {
        rowVirtualizer.scrollToIndex(0)
    }, [queryResults.isLoading])

    const { mutate } = useMutation({
        mutationFn: (values) =>
            setQueryValues({
                type: type,
                queryType: values.queryType,
                query: values.query,
                page: currentPage,
            }),
    })

    const onSubmit = async (values) => {
        if (values.query === "") return
        mutate(values)
    }

    const parentRef = useRef()
    const rowVirtualizer = useVirtualizer({
        count: queryResults?.data?.results.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => (isDesktop ? 240 : 96),
        overscan: isDesktop ? 3 : 7,
        gap: 16,
        enabled: !form.formState.isSubmitting,
    })

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1)
        rowVirtualizer.scrollToIndex(0)
    }
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1)
        rowVirtualizer.scrollToIndex(0)
    }

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

                    <Button type="submit" disabled={queryResults.isLoading}>
                        {queryResults.isLoading && (
                            <LoaderCircle
                                className={`h-4 w-4 animate-spin md:mr-2`}
                            />
                        )}
                        {!queryResults.isLoading && (
                            <Search className="h-4 w-4 md:mr-2" />
                        )}

                        {isDesktop && !queryResults.isLoading && "Search"}
                        {isDesktop && queryResults.isLoading && "Searching"}
                    </Button>
                </form>
            </Form>
            {queryResults.isLoading && (
                <div
                    className={`flex w-full flex-1 items-center justify-center md:min-h-32`}
                >
                    <LoadingSpinner size={96} className={`text-purple-500`} />
                </div>
            )}
            {queryResults.data && (
                <div
                    ref={parentRef}
                    className={`mt-4 h-full max-h-[1024px] w-full flex-1 justify-start overflow-y-scroll`}
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
                                item={
                                    queryResults.data.results[virtualItem.index]
                                }
                                board={board}
                                virtualizedStyles={virtualItem.start}
                                style={{
                                    transform: `translateY(${virtualItem.start}px)`,
                                }}
                            />
                        ))}
                    </div>
                    {queryResults.data.total_pages > 1 && (
                        <div className={`my-2 flex flex-row justify-between`}>
                            <Button
                                variant="ghost"
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                            >
                                Previous Page
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={handleNextPage}
                                disabled={
                                    currentPage ===
                                    queryResults.data.total_pages
                                }
                            >
                                Next Page
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </section>
    )
}
