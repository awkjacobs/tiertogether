import { useAtomValue } from "jotai"
import Poster from "./Card Components/Poster"
import { CARD_SIZE } from "./_const/const"
import { cardSizeAtom } from "@app/atoms"

/**
 * Renders a card overlay with a poster for the given item, styled according to the current card size from global state.
 *
 * @param {{ id: string, type: string }} item - The item to display in the card overlay.
 */
export default function CardOverlay({ item }) {
    const cardSize = useAtomValue(cardSizeAtom)

    return (
        <div
            className={`${CARD_SIZE[cardSize] ?? CARD_SIZE["null"]} relative block aspect-[2/3] rounded shadow-[4px_8px_30px_-10px_rgba(0,0,0,1)]`}
        >
            <Poster itemId={item.id} itemType={item.type} />
        </div>
    )
}
