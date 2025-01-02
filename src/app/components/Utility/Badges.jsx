import { Badge } from "@components/ui/badge"
import { cn } from "@lib/utils"
import { RELEASE_DATE } from "@lib/const"

export function ReleaseBadge({ release }) {
    if (!release) return null
    const date = RELEASE_DATE(release)

    return <Badge className={`h-min min-w-max`}>{date}</Badge>
}

export function GenreBadge({ genre, className }) {
    return (
        <Badge
            className={cn(
                `h-min min-w-max border-purple-500 dark:border-purple-500`,
                className,
            )}
            variant={"outline"}
        >
            {genre.name}
        </Badge>
    )
}
export function PlatformBadge({ platform, className }) {
    return (
        <Badge
            className={cn(
                `h-min min-w-max border-emerald-500 dark:border-emerald-500`,
                className,
            )}
            variant={"outline"}
        >
            {platform.name}
        </Badge>
    )
}
