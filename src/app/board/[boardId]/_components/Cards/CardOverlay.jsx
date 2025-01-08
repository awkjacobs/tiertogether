import Poster from "./Card Components/Poster"
import { useSearchParams } from "next/navigation"
import { CARD_SIZE } from "./_const/const"

export function CardOverlay({ item }) {
    const searchParams = useSearchParams()
    const urlCardSize = searchParams.get("cardSize")

    return (
        <div
            className={`${CARD_SIZE[urlCardSize]} relative block aspect-[2/3] rounded shadow-[4px_8px_30px_-10px_rgba(0,0,0,1)]`}
        >
            <Poster itemId={item.id} itemType={item.type} />
        </div>
    )
}
