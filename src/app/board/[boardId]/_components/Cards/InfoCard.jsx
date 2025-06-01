import Poster from "./Card Components/Poster"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@components/ui/tooltip"
import { useSetAtom } from "jotai"
import { dialogIsOpenAtom, selectedItemAtom } from "@app/atoms"

/**
 * Renders an interactive card displaying item information with tooltip support.
 *
 * When clicked, opens a dialog and sets the selected item in global state. The card displays a poster image and shows the item's name or title in a tooltip on hover or focus.
 *
 * @param {Object} props
 * @param {Object} props.item - The item to display. Its `type` property will be set to {@link itemType}.
 * @param {string} props.itemType - The type to assign to the item.
 * @param {string} props.size - The size variant for the card.
 * @param {"search"|"collection"} props.searchOrCollection - Determines styling based on context.
 */
export default function InfoCard({ item, itemType, size, searchOrCollection }) {
    const setSelectedItem = useSetAtom(selectedItemAtom)
    const setDialogIsOpen = useSetAtom(dialogIsOpenAtom)

    item.type = itemType
    const name = item?.name ? item?.name : item?.title
    const handleSelect = () => {
        setDialogIsOpen(true)
        setSelectedItem(`${item.id}-${item.type}`)
    }

    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <li
                        onClick={handleSelect}
                        className={`block cursor-pointer`}
                    >
                        <Poster
                            className={`${searchOrCollection == "search" && "h-24 md:h-60"} ${searchOrCollection == "collection" && "h-28 transition-all md:hover:scale-105 md:hover:shadow-purple-200/50"} w-auto justify-self-center shadow-lg`}
                            itemId={`${item.id}-${itemType}`}
                        />
                    </li>
                </TooltipTrigger>
                <TooltipContent>{name}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
