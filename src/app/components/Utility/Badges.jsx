import { Badge } from "@components/ui/badge"
import { cn } from "@lib/utils"
import { releaseDate } from "@lib/const"
import { TMDB_genres } from "@lib/tmdbGenres"
import { IGDB_genres } from "@lib/igdbConst"
import { AppDataContext } from "../_providers/appDataProvider"
import { useContext } from "react"

export function ReleaseBadge({ release }) {
    if (!release) return null
    const date = releaseDate(release)

    return <Badge className={`h-min min-w-max`}>{date}</Badge>
}

export function GenreBadge({ genreId, className }) {
    const { appData } = useContext(AppDataContext)
    const { board } = appData
    const type = board.type

    return (
        <Badge
            className={cn(
                `h-min min-w-max border-purple-500 dark:border-purple-500`,
                className,
            )}
            variant={"outline"}
        >
            {(type === "movie" || type === "tv" || type === "anime") &&
                TMDB_genres[genreId]}
            {type === "videoGame" && IGDB_genres[genreId]}
        </Badge>
    )
}
export function PlatformBadge({ platform, className }) {
    return (
        <Badge
            className={cn(
                `h-min min-w-max border-purple-500 dark:border-purple-500`,
                className,
            )}
            variant={"outline"}
        >
            {platform.name}
        </Badge>
    )
}
