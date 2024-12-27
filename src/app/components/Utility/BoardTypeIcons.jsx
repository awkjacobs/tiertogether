import AnimeCross from "@components/Utility/animeCross"
import { Clapperboard, Gamepad2, Tv } from "lucide-react"

export default function BoardTypeIcon({ type }) {
    if (type === "movie")
        return <Clapperboard className={`stroke-purple-200`} />
    if (type === "tv") return <Tv className={`stroke-purple-200`} />
    if (type === "anime")
        return <AnimeCross className={`h-6 w-6 text-purple-200`} />
    if (type === "videoGame")
        return <Gamepad2 className={`h-6 w-6 text-purple-200`} />
}
