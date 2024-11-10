import { useState } from "react"
import SearchBox from "./Dialog Components/SearchBox"
import VirtualizedList from "./Dialog Components/VirtualizedList"
import SearchLoadingContainer from "./Dialog Components/SearchLoadingContainer"
import MovieTvSearch from "./Dialog Components/movie-tv-search"

// TODO - add more search options
// TODO - figure out how to add pages as you go

export default function AddDialogContent({ appData, board }) {
    const type = board.type

    const [queryType, setQueryType] = useState(
        type == "movie" ? "Title" : "Series",
    )

    const [queryResults, setQueryResults] = useState([])
    const [pageCount, setPageCount] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const clearResults = () => {
        setLoading(false)
        setQueryResults([])
    }

    return (
        <section
            className={`flex h-full flex-1 flex-col items-start overflow-y-hidden p-4 md:overflow-x-visible md:p-0`}
        >
            {/* <SearchBox
                onChangeSearch={onChangeSearch}
                debouncedTerm={debouncedTerm}
                queryType={queryType}
                setQueryType={setQueryType}
                queryTypesList={queryTypesList}
                /> */}
            <MovieTvSearch
                setQueryResults={setQueryResults}
                setLoading={setLoading}
                clearResults={clearResults}
                queryType={queryType}
                setQueryType={setQueryType}
                // queryTypesList={queryTypesList}
                type={type}
                pageCount={pageCount}
                setPageCount={setPageCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <VirtualizedList
                loading={loading}
                queryResults={queryResults}
                queryType={queryType}
                type={type}
                appData={appData}
                board={board}
                pageCount={pageCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            {loading && <SearchLoadingContainer />}
        </section>
    )
}
