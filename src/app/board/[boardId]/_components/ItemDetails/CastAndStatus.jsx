import DescriptionGroup from "./DescriptionGroup"
import { creditCasting } from "@components/Utility/creditCasting"
import { findDirectors } from "@components/Utility/findDirectors"
import { Skeleton } from "@app/components/ui/skeleton"
import {
    useGetCreditsQuery,
    useGetDetailsQuery,
} from "@app/hooks/use-get-fetch-query"

export default function CastAndStatus({ itemId, type }) {
    const credits = useGetCreditsQuery(itemId, type)
    const details = useGetDetailsQuery(itemId, type)

    return (
        <div
            className={
                "grid grid-cols-[auto_1fr] gap-2 rounded-md bg-surface-300/60 p-2 text-xs dark:bg-surface-800/60"
            }
        >
            {credits.isLoading && (
                <>
                    <Skeleton className={`h-4 w-full`} />
                    <Skeleton className={`h-4 w-full`} />
                </>
            )}
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
            {details.isLoading && (
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
            {!details.isLoading && details.data?.budget > 0 && (
                <DescriptionGroup
                    section={"Budget:"}
                    content={`$${details.data.budget.toLocaleString()}`}
                />
            )}
            {!details.isLoading && details.data?.revenue > 0 && (
                <DescriptionGroup
                    section={"Revenue:"}
                    content={`$${details.data.revenue.toLocaleString()}`}
                />
            )}
        </div>
    )
}
