import Poster from "./Card Components/Poster"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@components/ui/tooltip"
import { useSetAtom } from "jotai"
import { dialogIsOpenAtam, selectedItemAtom } from "../../../../atoms"

export default function InfoCard({ item, itemType, size, searchOrCollection }) {
    const setSelectedItem = useSetAtom(selectedItemAtom)
    const setDialogIsOpen = useSetAtom(dialogIsOpenAtam)

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
