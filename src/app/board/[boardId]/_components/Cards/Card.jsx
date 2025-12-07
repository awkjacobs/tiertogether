import { cardSizeAtom, dialogIsOpenAtom, selectedItemAtom } from "@app/atoms"
import { AppDataContext } from "@app/components/_providers/appDataProvider"
import { ItemRankContext } from "@app/components/_providers/itemRankProvider"
import { useGetDetailsQuery } from "@app/hooks/use-get-fetch-query"
import { useMediaQuery } from "@app/hooks/use-media-query"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@components/ui/tooltip"
import { RankGroup, RankOverall } from "@app/components/Utility/RankGroup"
import RankingsTooltipDisplay from "@app/components/Utility/RankingsTooltipDisplay"
import { COMPARED_RANK, ITEM_ID_TYPE } from "@lib/const"
import { useAtomValue, useSetAtom } from "jotai"
import { useContext } from "react"
import Poster from "./Card Components/Poster"
import { CARD_SIZE } from "./_const/const"

const getCardClassName = (cardSize, tier, isDragging) => {
    const baseClasses = CARD_SIZE[cardSize] ?? CARD_SIZE["null"]
    const tierClasses =
        tier === "cardsQueue"
            ? "swiper-no-swiping shadow-[0_0_16px_0] shadow-black md:opacity-0 md:hover:shadow-[0_0_16px_4px] md:group-hover:opacity-100"
            : "shadow-[0_8px_16px_-4px_rgba(0,0,0,1)]"
    return `${baseClasses} relative block overflow-hidden rounded ${tierClasses} ${isDragging ? "opacity-50" : ""}`
}

/**
 * Renders a card component displaying an item with optional ranking, tooltip, and interaction features.
 *
 * The card adapts its layout and behavior based on viewport size, active state, and provided props. On desktop, it displays tooltips with item details and ranking information. On mobile, it provides touch-friendly interactions. The card can highlight differences in ranking when the `difference` prop is enabled.
 *
 * @param {object} props.item - The item to display in the card, including its ID and ranking data.
 * @param {React.ReactNode} props.children - Optional child elements to render inside the card.
 * @param {boolean} props.isDragging - Whether the card is currently being dragged.
 * @param {string} props.tier - The tier or category of the card, affecting its appearance.
 * @param {boolean} props.activeItem - If true, renders the card in an active state with minimal content.
 * @param {boolean} [props.difference=false] - If true, displays additional ranking comparison information in the tooltip.
 * @param {object} [props.scoreToCompareAgainst] - Optional score data used for ranking comparison.
 *
 * @returns {JSX.Element} The rendered card component.
 */
export function Card({
    item,
    children,
    isDragging,
    tier,
    activeItem,
    difference = false,
    scoreToCompareAgainst,
}) {
    const { appData, userEntries } = useContext(AppDataContext)
    const setSelectedItem = useSetAtom(selectedItemAtom)
    const setDialogIsOpen = useSetAtom(dialogIsOpenAtom)
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const cardSize = useAtomValue(cardSizeAtom)
    const { id: itemId, type: itemType } = ITEM_ID_TYPE(item.id)
    const details = useGetDetailsQuery(itemId, itemType)

    const name = details.data?.name ? details.data?.name : details.data?.title

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
            <li className={getCardClassName(cardSize, tier, isDragging)}>
                <Poster
                    className={`${CARD_SIZE[cardSize] ?? CARD_SIZE["null"]}`}
                    itemId={item.id}
                />
            </li>
        )

    if (isDesktop)
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
                                className={getCardClassName(
                                    cardSize,
                                    tier,
                                    isDragging,
                                )}
                            >
                                <Poster
                                    className={`${CARD_SIZE[cardSize] ?? CARD_SIZE["null"]}`}
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
                    className={getCardClassName(cardSize, tier, isDragging)}
                >
                    {children}

                    <Poster
                        className={`${CARD_SIZE[cardSize] ?? CARD_SIZE["null"]}`}
                        itemId={item.id}
                    />
                </li>
            </ItemRankContext.Provider>
        )
}
