import { Badge } from "@/components/ui/badge"
import { cn, convertDate } from "@lib/utils"
import { TMDB_genres } from "@lib/tmdbGenres"

export function ReleaseBadge({ release }) {
    let releaseArr = release.map((date) => (date ? convertDate(date) : null))

    if (releaseArr.length < 2 || !releaseArr[1])
        return <Badge className={`h-min min-w-max`}>{releaseArr[0]}</Badge>
    return (
        <Badge className={`h-min min-w-max`}>
            {releaseArr[0] + " - " + releaseArr[1]}
        </Badge>
    )
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
