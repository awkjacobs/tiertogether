import { GenreBadge, ReleaseBadge } from "@/app/components/Utility/Badges"
import { useGetDetailsQuery } from "@/app/hooks/use-get-fetch-query"
import { Skeleton } from "@/app/components/ui/skeleton"

export default function DescriptionContainer({ item, type }) {
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
            <ReleaseBadge
                release={
                    details.data.release_date
                        ? [details.data.release_date]
                        : [
                              details.data.first_air_date,
                              details.data?.last_air_date,
                          ]
                }
            />
            {details.data?.genre_ids &&
                details.data.genre_ids.map((id) => (
                    <GenreBadge genreId={id} key={id} />
                ))}
            {details.data?.genres &&
                details.data.genres.map((genre) => (
                    <GenreBadge genreId={genre.id} key={genre.id} />
                ))}
        </div>
    )
}
