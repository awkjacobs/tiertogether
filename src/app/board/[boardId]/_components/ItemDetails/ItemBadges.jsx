import {
    GenreBadge,
    PlatformBadge,
    ReleaseBadge,
} from "@app/components/Utility/Badges"
import { useGetDetailsQuery } from "@app/hooks/use-get-fetch-query"
import { Skeleton } from "@app/components/ui/skeleton"
import { get_release } from "@lib/const"

export default function ItemBadges({ item, type }) {
    const details = useGetDetailsQuery(item.id, type)

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
            <ReleaseBadge release={get_release(item, details)} />
            {details.data?.genre_ids &&
                details.data.genre_ids.map((id) => (
                    <GenreBadge genreId={id} key={id} />
                ))}
            {details.data?.genres &&
                details.data.genres.map((genre) => (
                    <GenreBadge genre={genre} key={genre.id} />
                ))}
            {item?.platforms &&
                item.platforms.map((platform) => (
                    <PlatformBadge platform={platform} key={platform.id} />
                ))}
        </div>
    )
}
