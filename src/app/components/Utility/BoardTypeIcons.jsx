import AnimeCross from "@app/components/Utility/animeCross"
import { cn } from "@lib/utils"
import { Clapperboard, Gamepad2, Tv } from "lucide-react"

export default function BoardTypeIcon({ type, className }) {
    if (type === "movie")
        return <Clapperboard className={cn(`text-purple-200`, className)} />
    if (type === "tv")
        return <Tv className={cn(`text-purple-200`, className)} />
    if (type === "anime")
        return (
            <AnimeCross className={cn(`h-6 w-6 text-purple-200`, className)} />
        )
    if (type === "videoGame")
        return <Gamepad2 className={cn(`h-6 w-6 text-purple-200`, className)} />
}
