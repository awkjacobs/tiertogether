import { useMediaQuery } from "@app/hooks/use-media-query"
import Poster from "./Card Components/Poster"
import { useSearchParams } from "next/navigation"

const size = {
    null: "w-10 md:w-16",
    1: "w-10 md:w-16",
    2: "w-16 md:w-20",
    3: "w-20 md:w-24",
}

export function CardOverlay({ item }) {
    const searchParams = useSearchParams()
    const urlCardSize = searchParams.get("cardSize")

    return (
        <div
            className={`${size[urlCardSize]} relative block aspect-[2/3] rounded shadow-[4px_8px_30px_-10px_rgba(0,0,0,1)]`}
        >
            <Poster itemId={item.id} itemType={item.type} />
        </div>
    )
}
