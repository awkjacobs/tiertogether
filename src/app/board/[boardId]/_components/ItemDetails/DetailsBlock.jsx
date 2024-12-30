import DescriptionGroup from "./DescriptionGroup"
import { creditCasting } from "@app/board/[boardId]/_components/ItemDetails/creditCasting"
import { findDirectors } from "@app/board/[boardId]/_components/ItemDetails/findDirectors"
import { Skeleton } from "@app/components/ui/skeleton"
import {
    useGetCreditsQuery,
    useGetDetailsQuery,
} from "@app/hooks/use-get-fetch-query"
import { ItemDataContext } from "@app/components/_providers/itemDataProvider"
import { useContext } from "react"

export default function DetailsBlock() {
    const { itemId, itemType, details } = useContext(ItemDataContext)
    const credits = useGetCreditsQuery(itemId, itemType)
    // const details = useGetDetailsQuery(itemId, type)

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
            {itemType === "movie" &&
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
            {itemType === "movie" &&
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
                (itemType === "tv" || itemType === "anime") && (
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
            {!details.isLoading && details.data?.involved_companies && (
                <DescriptionGroup
                    section={"Developers:"}
                    content={details.data.involved_companies
                        .filter((company) => company.developer === true)
                        .map((company) => company.company.name)
                        .join(", ")}
                />
            )}
            {details.data?.platforms && (
                <DescriptionGroup
                    section={"Platforms:"}
                    content={details.data?.platforms
                        .map((platform) => platform.name)
                        .join(", ")}
                />
            )}
        </div>
    )
}
