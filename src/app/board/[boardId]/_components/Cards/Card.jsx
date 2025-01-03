import { useGetDetailsQuery } from "@app/hooks/use-get-fetch-query"
import { useMediaQuery } from "@app/hooks/use-media-query"
import RankingsTooltipDisplay from "@components/Utility/RankingsTooltipDisplay"
import { useSearchParams } from "next/navigation"
import Poster from "./Card Components/Poster"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@components/ui/tooltip"
import { RankGroup, RankOverall } from "@components/Utility/RankGroup"
import { useContext } from "react"
import { AppDataContext } from "@app/components/_providers/appDataProvider"
import { ItemRankContext } from "@app/components/_providers/itemRankProvider"
import { COMPARED_RANK, ITEM_ID_TYPE } from "@lib/const"

const size = {
    null: "h-20 md:h-24",
    1: "h-20 md:h-24",
    2: "w-16 md:w-20",
    3: "w-20 md:w-24",
}

export function Card({
    index,
    item,
    children,
    isDragging,
    tier,
    activeItem,
    difference = false,
    scoreToCompareAgainst,
}) {
    const { appData, userEntries, setDialogIsOpen, setSelectedItem } =
        useContext(AppDataContext)
    const { user, board } = appData
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const searchParams = useSearchParams()
    const urlCardSize = searchParams.get("cardSize")
    const { id: itemId, type: itemType } = ITEM_ID_TYPE(item.id)
    const details = useGetDetailsQuery(itemId, itemType)

    const name = details.data?.name ? details.data?.name : details.data?.title

    // ? need to check into this with change in added by row
    const allowedToRemoveItemFromBoard =
        user.id === board.ownerId || user.id === item.addedBy.id

    const userRank = {
        boardId: appData.board.id,
        id: appData.user.id,
        itemsId: item.id,
        name: appData.user.name,
        rank: item.rank.find((rank) => rank.userId === appData.user.id).rank,
        userId: appData.user.id,
    }

    const handleSelect = () => {
        setDialogIsOpen(true)
        setSelectedItem(item.id)
    }
    const handleHover = () => {
        setSelectedItem(item.id)
    }
    if (activeItem)
        return (
            <li
                className={`${size[urlCardSize]} relative mx-1 block overflow-hidden shadow-[4px_8px_16px_-4px_rgba(0,0,0,1)] ${
                    isDragging
                        ? "opacity-50"
                        : tier === "cardsQueue"
                          ? "opacity-0"
                          : "opacity-100"
                }`}
            >
                <Poster className={`${size[urlCardSize]}`} itemId={item.id} />
            </li>
        )

    if (!activeItem && isDesktop)
        return (
            <ItemRankContext.Provider value={userRank}>
                <TooltipProvider
                    delayDuration={tier === "cardsQueue" ? 9999 : 100}
                >
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <li
                                onClick={handleSelect}
                                onMouseEnter={handleHover}
                                className={`block ${size[urlCardSize]} ${
                                    tier === "cardsQueue"
                                        ? "swiper-no-swiping shadow-[0_0_16px_0] shadow-black md:opacity-0 md:hover:shadow-[0_0_16px_4px] md:group-hover:opacity-100"
                                        : "mx-1 shadow-[0_8px_16px_-4px_rgba(0,0,0,1)]"
                                } relative w-auto overflow-hidden rounded transition-all md:hover:scale-105 md:hover:shadow-purple-200`}
                            >
                                <Poster
                                    className={`${size[urlCardSize]}`}
                                    itemId={item.id}
                                />
                                {children}
                            </li>
                        </TooltipTrigger>
                        <TooltipContent>{name}</TooltipContent>
                        {difference && (
                            <TooltipContent side="bottom">
                                <RankingsTooltipDisplay
                                    difference={difference}
                                    userEntries={userEntries}
                                >
                                    {userEntries === "overall" && (
                                        <RankOverall
                                            averageRank={item.averageRank}
                                        />
                                    )}
                                    {userEntries !== "overall" && (
                                        <RankGroup
                                            rank={COMPARED_RANK(
                                                item,
                                                appData,
                                                userEntries,
                                                scoreToCompareAgainst,
                                            )}
                                        />
                                    )}
                                    <RankGroup rank={userRank} />
                                </RankingsTooltipDisplay>
                            </TooltipContent>
                        )}
                    </Tooltip>
                </TooltipProvider>
            </ItemRankContext.Provider>
        )
    if (!activeItem && !isDesktop)
        return (
            <ItemRankContext.Provider value={userRank}>
                <li
                    onClick={handleSelect}
                    onPointerDown={handleHover}
                    className={`${size[urlCardSize]} block ${
                        tier === "cardsQueue"
                            ? "swiper-no-swiping shadow-[0_0_16px_0] shadow-black md:opacity-0 md:hover:shadow-[0_0_16px_4px] md:group-hover:opacity-100"
                            : "mx-1 shadow-[0_8px_16px_-4px_rgba(0,0,0,1)]"
                    } relative aspect-[2/3] overflow-hidden rounded transition-all md:hover:scale-105 md:hover:shadow-purple-200`}
                >
                    {children}

                    <Poster
                        className={`${size[urlCardSize]}`}
                        itemId={item.id}
                    />
                </li>
            </ItemRankContext.Provider>
        )
}
