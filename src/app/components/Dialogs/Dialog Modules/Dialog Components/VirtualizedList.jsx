import { useMediaQuery } from "@/app/hooks/use-media-query"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useRef } from "react"
import SearchCard from "../../../Cards/SearchCard"
import { Button } from "@/app/components/ui/button"

export default function VirtualizedList({
    loading,
    queryResults,
    queryType,
    type,
    appData,
    board,
    pageCount,
    currentPage,
    setCurrentPage,
}) {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const parentRef = useRef()
    const rowVirtualizer = useVirtualizer({
        count:
            queryResults.length <= 20 ? queryResults.length : currentPage * 20,
        getScrollElement: () => parentRef.current,
        estimateSize: () => (isDesktop ? 240 : 96),
        overscan: isDesktop ? 3 : 7,
        gap: 16,
        enabled: !loading,
    })
    return (
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
                        queryType={queryType}
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
    )
}
