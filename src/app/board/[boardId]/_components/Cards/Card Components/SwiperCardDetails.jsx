import { Skeleton } from "@app/components/ui/skeleton"
import { findDirectors } from "@app/board/[boardId]/_components/ItemDetails/findDirectors"
import {
    useGetCreditsQuery,
    useGetDetailsQuery,
} from "@app/hooks/use-get-fetch-query"
import { GET_RELEASE, ITEM_ID_TYPE, RELEASE_DATE } from "@lib/const"

export function SwiperCardDetails({ item }) {
    const { id: itemId, type } = ITEM_ID_TYPE(item.id)
    const credits = useGetCreditsQuery(itemId, type)
    const details = useGetDetailsQuery(itemId, type)

    const date = GET_RELEASE(item, details)

    return (
        <div
            className={`grid grid-cols-[auto_1fr] gap-1 rounded bg-zinc-900/60 p-2 text-xs text-purple-50`}
        >
            {date && (
                <SwiperCardDetailsGroup
                    section={
                        type === "movie" || type === "videoGame"
                            ? "Released:"
                            : "Air Dates:"
                    }
                    content={RELEASE_DATE(date)}
                />
            )}
            {credits.isLoading && (
                <>
                    <Skeleton className={`h-4 w-full`} />
                    <Skeleton className={`h-4 w-full`} />
                </>
            )}
            {type === "movie" &&
                !credits.isLoading &&
                findDirectors(credits.data).length > 0 && (
                    <SwiperCardDetailsGroup
                        section={
                            findDirectors(credits.data).length > 1
                                ? "Directors:"
                                : "Director:"
                        }
                        content={findDirectors(credits.data).join(", ")}
                    />
                )}
            {details.isLoading && (
                <>
                    <Skeleton className={`h-4 w-full`} />
                    <Skeleton className={`h-4 w-full`} />
                </>
            )}

            {!details.isLoading && details.data?.number_of_seasons && (
                <SwiperCardDetailsGroup
                    section={"Length:"}
                    content={`
                        ${details.data.number_of_seasons.toString()} ${
                            details.data.number_of_seasons > 1
                                ? "Seasons / "
                                : "Season / "
                        } ${details.data.number_of_episodes.toString()} Eps`}
                />
            )}
            {!details.isLoading &&
                details.data?.status &&
                (type === "tv" || type === "anime") && (
                    <SwiperCardDetailsGroup
                        section={"Status:"}
                        content={`
                        ${details.data.status}`}
                    />
                )}
            {!details.isLoading && details.data?.involved_companies && (
                <SwiperCardDetailsGroup
                    section={"Developers:"}
                    content={details.data.involved_companies
                        .filter((company) => company.developer === true)
                        .map((company) => company.company.name)
                        .join(", ")}
                />
            )}
        </div>
    )
}

function SwiperCardDetailsGroup({ section, content }) {
    return (
        <div className={`col-start-1 col-end-3 grid grid-cols-subgrid`}>
            <span className={`col-start-1 pr-2 font-light opacity-60`}>
                {section}
            </span>
            <p className={`col-start-2`}>{content}</p>
        </div>
    )
}
