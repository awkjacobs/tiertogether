"'use client'"
import { useMediaQuery } from "@/app/hooks/use-media-query"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { TMDB_genres } from "@/lib/const"
import { Filter, Search, X } from "lucide-react"
import { useEffect, useState } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    TMDB_SEARCH,
    TMDB_SEARCH_ACTOR_MOVIE,
    TMDB_SEARCH_DIRECTOR,
    TMDB_SEARCH_ANIME_SERIES,
    TMDB_SEARCH_ANIME_MOVIE,
    TMDB_SEARCH_TITLE,
    TMDB_SEARCH_ACTOR_TV,
    TMDB_SEARCH_TV_SERIES,
} from "@/lib/movieFuncs"
import { queryTypesList } from "@/lib/const"

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
    const [open, setOpen] = useState(false)

    const [term, setTerm] = useState("")
    const [debouncedTerm, setDebouncedTerm] = useState(term)
    // const [genres, setGenres] = useState([])
    // const [contentTypes, setContentTypes] = useState([])
    // const [isOpen, setIsOpen] = useState(false)

    const onChangeSearch = (e) => {
        clearResults()
        setDebouncedTerm(e.target.value)
        if (e.target.value !== "") setLoading(true)
    }

    // update 'term' value after 1 second from the last update of 'debouncedTerm'
    useEffect(() => {
        const timer = setTimeout(() => setTerm(debouncedTerm), 1000)

        return () => clearTimeout(timer)
    }, [debouncedTerm])

    // submit a new search
    useEffect(() => {
        if (term !== "") {
            onSearchSubmit(term, queryType, currentPage)
        } else {
            clearResults()
        }
    }, [term])
    useEffect(() => {
        if (term === "") return
        clearResults()
        onSearchSubmit(term, queryType, currentPage)
    }, [queryType])

    async function onSearchSubmit(term, queryType, page) {
        let res
        let pageCount
        // if (genres.length === 0 && contentTypes.length === 0) {
        //     let response = await TMDB_SEARCH(term, page)
        //     res = response.results
        //     pageCount = response.total_pages
        // }
        if (type === "movie") {
            switch (queryType) {
                case "Director":
                    res = await TMDB_SEARCH_DIRECTOR(term)
                    break
                case "Actor":
                    res = await TMDB_SEARCH_ACTOR_MOVIE(term)
                    break

                default:
                    res = await TMDB_SEARCH_TITLE(term)
                    break
            }
        }
        if (type === "anime") {
            switch (queryType) {
                case "Movie":
                    res = await TMDB_SEARCH_ANIME_MOVIE(term)
                    break

                default:
                    res = await TMDB_SEARCH_ANIME_SERIES(term)
                    break
            }
        }
        if (type === "tv") {
            switch (queryType) {
                case "Actor":
                    res = await TMDB_SEARCH_ACTOR_TV(term)
                    break

                default:
                    res = await TMDB_SEARCH_TV_SERIES(term)
                    break
            }
        }
        // setQueryResults((prev) => {
        //     return [...prev, ...res]
        // })
        setQueryResults(res)
        // setPageCount(pageCount)
        setLoading(false)
    }
    const handleSearch = () => {
        setLoading(true)
        onSearchSubmit(term, queryType, currentPage)
    }
    // const handleOpen = () => {
    //     setIsOpen(!isOpen)
    // }

    // const handleGenreSelect = (genre) => {
    //     setGenres((prev) =>
    //         prev.includes(genre)
    //             ? prev.filter((g) => g !== genre)
    //             : [...prev, genre],
    //     )
    // }

    // const handleContentTypeSelect = (type) => {
    //     setContentTypes((prev) =>
    //         prev.includes(type)
    //             ? prev.filter((t) => t !== type)
    //             : [...prev, type],
    //     )
    // }

    // const genreOptions = Object.entries(TMDB_genres).map((e) => e[0])
    // const contentTypeOptions = ["Movie", "TV Show", "Actor", "Director"]

    return (
        <div className="mx-auto w-full space-y-4 md:p-1">
            <div className="flex space-x-2">
                <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button className={`h-8 min-w-14`}>{queryType}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[200px]">
                        <DropdownMenuLabel>Search For</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            {queryTypesList(type).map((queryType) => (
                                <DropdownMenuItem
                                    key={queryType}
                                    value={queryType}
                                    onSelect={(queryType) =>
                                        setQueryType(
                                            queryType.target.textContent,
                                        )
                                    }
                                >
                                    {queryType}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Input
                    autoFocus
                    type="search"
                    placeholder={`Search for ${queryType}...`}
                    // value={debouncedTerm}
                    // onChange={onChangeSearch}
                    onChange={onChangeSearch}
                    className="flex-grow"
                />
                <Button onClick={handleSearch} className={`h-8`} type="submit">
                    <Search className="h-4 w-4 md:mr-2" />{" "}
                    {isDesktop && "Search"}
                </Button>
                {/* <Button
                    onClick={handleOpen}
                    className={`h-8 border-0 ${!isOpen && "outline outline-1 outline-zinc-900"}`}
                    variant={isOpen ? "default" : "outline"}
                >
                    <Filter className="h-4 w-4 md:mr-2" />{" "}
                    {isDesktop && "Filters"}
                </Button> */}
            </div>
            {/* <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleContent className={`space-y-4`}>
                    <div className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Content Type
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {contentTypeOptions.map((type) => (
                                    <Badge
                                        key={type}
                                        variant={
                                            contentTypes.includes(type)
                                                ? "default"
                                                : "outline"
                                        }
                                        className="cursor-pointer"
                                        onClick={() =>
                                            handleContentTypeSelect(type)
                                        }
                                    >
                                        {type}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Genres
                            </label>
                            <div className="no-scrollbar flex h-min flex-nowrap gap-2 overflow-x-scroll md:flex-wrap">
                                {genreOptions.map((genre) => (
                                    <Badge
                                        key={genre}
                                        variant={
                                            genres.includes(genre)
                                                ? "default"
                                                : "outline"
                                        }
                                        className="cursor-pointer text-nowrap"
                                        onClick={() => handleGenreSelect(genre)}
                                    >
                                        {TMDB_genres[genre]}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </CollapsibleContent>
            </Collapsible> */}
            {/* {(genres.length > 0 || contentTypes.length > 0) && (
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium">Active Filters:</span>
                    {genres.map((genre) => (
                        <Badge
                            key={genre}
                            variant="secondary"
                            className="flex cursor-pointer items-center gap-1"
                            onClick={() => handleGenreSelect(genre)}
                        >
                            {TMDB_genres[genre]}
                            <X className="h-3 w-3" />
                        </Badge>
                    ))}
                    {contentTypes.map((type) => (
                        <Badge
                            key={type}
                            variant="secondary"
                            className="flex cursor-pointer items-center gap-1"
                            onClick={() => handleContentTypeSelect(type)}
                        >
                            {type}
                            <X className="h-3 w-3" />
                        </Badge>
                    ))}
                </div>
            )} */}
        </div>
    )
}
