import { Badge } from "@components/ui/badge"
import { cn } from "@lib/utils"
import { convertDate, releaseDate } from "@lib/const"
import { TMDB_genres } from "@lib/tmdbGenres"

export function ReleaseBadge({ release }) {
    const date = releaseDate(release)

    return <Badge className={`h-min min-w-max`}>{date}</Badge>
}

export function GenreBadge({ genreId, className }) {
    return (
        <Badge
            className={cn(
                `h-min min-w-max border-purple-500 dark:border-purple-500`,
                className,
            )}
            variant={"outline"}
        >
            {TMDB_genres[genreId]}
        </Badge>
    )
}
