import { GenreBadge, ReleaseBadge } from "@app/components/Utility/Badges"
import { Skeleton } from "@app/components/ui/skeleton"
import { GET_RELEASE } from "@lib/const"
import { ItemDataContext } from "@app/components/_providers/itemDataProvider"
import { useContext } from "react"

export default function ItemBadges({ item }) {
    const { details } = useContext(ItemDataContext)

    if (details.isLoading)
        return (
            <div
                className={`relative row-start-2 row-end-3 flex h-min flex-wrap gap-2 md:col-start-2`}
            >
                <Skeleton className={`h-4 w-16`} />
                <Skeleton className={`h-4 w-16`} />
            </div>
        )

    return (
        <div
            className={`relative row-start-2 row-end-3 flex h-min flex-wrap gap-2 md:col-start-2`}
        >
            <ReleaseBadge release={GET_RELEASE(item, details)} />
            {details.data?.genre_ids &&
                details.data.genre_ids.map((id) => (
                    <GenreBadge genreId={id} key={id} />
                ))}
            {details.data?.genres &&
                details.data.genres.map((genre) => (
                    <GenreBadge genre={genre} key={genre.id} />
                ))}
        </div>
    )
}
