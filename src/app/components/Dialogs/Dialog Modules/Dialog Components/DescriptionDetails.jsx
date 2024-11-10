import { useQuery } from "@tanstack/react-query"
import DescriptionGroup from "./DescriptionGroup"
import { TMDB_GET_CREDITS, TMDB_GET_DETAILS } from "@/lib/movieFuncs"
import { creditCasting } from "@/app/components/Utility/creditCasting"
import { findDirectors } from "@/app/components/Utility/findDirectors"
import { Skeleton } from "@/app/components/ui/skeleton"

export default function DescriptionDetails({ itemId, type, queryType }) {
    const credits = useQuery({
        queryKey: ["credits", itemId],
        queryFn: () => TMDB_GET_CREDITS(itemId, type),
    })
    const details = useQuery({
        queryKey: ["details", itemId],
        queryFn: () => TMDB_GET_DETAILS(itemId, type),
    })

    return (
        <div
            className={
                "grid grid-cols-[auto_1fr] gap-2 rounded-md bg-surface-300/60 p-2 text-xs dark:bg-surface-800/60"
            }
        >
            {type === "movie" &&
                !credits.isLoading &&
                findDirectors(credits.data).length > 0 && (
                    <DescriptionGroup
                        section={
                            findDirectors(credits.data).length > 1
                                ? "Directors:"
                                : "Director:"
                        }
                        content={findDirectors(credits.data).join(", ")}
                    />
                )}
            {type === "movie" &&
                !credits.isLoading &&
                creditCasting(credits.data).length > 0 && (
                    <DescriptionGroup
                        section={"Starring:"}
                        content={creditCasting(credits.data).join(", ")}
                    />
                )}
            {credits.isLoading && (
                <>
                    <Skeleton className={`h-4 w-full`} />
                    <Skeleton className={`h-4 w-full`} />
                </>
            )}
            {!details.isLoading && details.data?.number_of_seasons && (
                <DescriptionGroup
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
                    <DescriptionGroup
                        section={"Status:"}
                        content={`
                        ${details.data.status}`}
                    />
                )}
            {details.isLoading && (
                <>
                    <Skeleton className={`h-4 w-full`} />
                    <Skeleton className={`h-4 w-full`} />
                </>
            )}
        </div>
    )
}
