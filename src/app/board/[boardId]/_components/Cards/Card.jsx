import { useGetDetailsQuery } from "@/app/hooks/use-get-fetch-query"
import { useMediaQuery } from "@/app/hooks/use-media-query"
import RankingsTooltipDisplay from "@/components/Utility/RankingsTooltipDisplay"
import { LoaderCircle } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { RemoveItemButton } from "../Buttons/RemoveItemButton"
import InfoDialogContent from "@/components/Dialogs/Dialog Modules/InfoDialogContent"
import Poster from "@/components/ui/Poster"
import { ResponsiveDialog } from "@/components/ui/ResponsiveDialog"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { RankGroup, RankOverall } from "@/components/Utility/RankGroup"
import { useContext } from "react"
import { AppDataContext } from "@/app/components/_providers/appDataProvider"
import { ItemRankContext } from "@/app/components/_providers/itemRankProvider"
import { comparedRank } from "@/lib/const"

const size = {
    null: "w-10 md:w-16",
    1: "w-10 md:w-16",
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
    setDialogIsOpen,
    difference = false,
    scoreToCompareAgainst,
}) {
    const { appData, userEntries } = useContext(AppDataContext)
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const searchParams = useSearchParams()
    const urlCardSize = searchParams.get("cardSize")
    const details = useGetDetailsQuery(item.id, appData.board.type)

    if (details.isLoading)
        return (
            <li
                className={`${size[urlCardSize]} relative mx-1 flex aspect-[2/3] items-center justify-center overflow-hidden shadow-[4px_8px_16px_-4px_rgba(0,0,0,1)] ${
                    tier === "cardsQueue" ? "opacity-0" : "opacity-100"
                }`}
            >
                <LoaderCircle
                    className={`h-8 w-8 animate-spin text-purple-500`}
                />
            </li>
        )

    const name = details.data.name ? details.data.name : details.data.title

    const { user, boardOwner, board } = appData

    // ? need to check into this with change in added by row
    const allowedToRemoveItemFromBoard = boardOwner
        ? true
        : user.id === item.addedBy.id
          ? true
          : false

    const userRank = {
        boardId: appData.board.id,
        id: appData.user.id,
        itemsId: item.id,
        name: appData.user.name,
        rank: item.rank.find((rank) => rank.userId === appData.user.id).rank,
        userId: appData.user.id,
    }

    const width = () => {
        if (isDesktop && urlCardSize === "2") return 80
        else if (isDesktop && urlCardSize === "3") return 96
        else if (!isDesktop && urlCardSize === "2") return 64
        else if (!isDesktop && urlCardSize === "3") return 80
        else if (isDesktop) return 64
        else if (!isDesktop) return 40
    }
    const height = () => {
        if (isDesktop && urlCardSize === "2") return 112
        else if (isDesktop && urlCardSize === "3") return 128
        else if (!isDesktop && urlCardSize === "2") return 96
        else if (!isDesktop && urlCardSize === "3") return 112
        else if (isDesktop) return 96
        else if (!isDesktop) return 60
    }

    if (activeItem)
        return (
            <li
                className={`${size[urlCardSize]} relative mx-1 block aspect-[2/3] overflow-hidden shadow-[4px_8px_16px_-4px_rgba(0,0,0,1)] ${
                    isDragging
                        ? "opacity-50"
                        : tier === "cardsQueue"
                          ? "opacity-0"
                          : "opacity-100"
                }`}
            >
                <Poster
                    itemId={item.id}
                    boardType={board.type}
                    width={width()}
                    height={height()}
                />
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
                                className={`block ${size[urlCardSize]} ${
                                    tier === "cardsQueue"
                                        ? "swiper-no-swiping shadow-[0_0_16px_0] shadow-black md:opacity-0 md:hover:shadow-[0_0_16px_4px] md:group-hover:opacity-100"
                                        : "mx-1 shadow-[0_8px_16px_-4px_rgba(0,0,0,1)]"
                                } relative aspect-[2/3] overflow-hidden rounded transition-all md:hover:scale-105 md:hover:shadow-purple-200`}
                            >
                                <ResponsiveDialog
                                    setIsOpen={setDialogIsOpen}
                                    trigger={
                                        <Poster
                                            itemId={item.id}
                                            boardType={board.type}
                                            width={width()}
                                            height={height()}
                                        />
                                    }
                                    triggerClasses={`p-0 h-auto w-auto`}
                                    component={
                                        <InfoDialogContent
                                            item={item}
                                            appData={appData}
                                        />
                                    }
                                    footer={
                                        <RemoveItemButton
                                            infoItem={item}
                                            appData={appData}
                                            disabled={
                                                !allowedToRemoveItemFromBoard
                                            }
                                            isDialog={true}
                                        />
                                    }
                                    title={name}
                                    backdrop={details.data.backdrop_path}
                                    hideDescription={true}
                                    hideTitle={true}
                                />
                                {children}
                            </li>
                        </TooltipTrigger>
                        <TooltipContent>
                            {details.data.name
                                ? details.data.name
                                : details.data.title}
                        </TooltipContent>
                        {difference && (
                            <TooltipContent side="bottom">
                                <RankingsTooltipDisplay difference={difference}>
                                    {userEntries === "overall" && (
                                        <RankOverall
                                            averageRank={item.averageRank}
                                        />
                                    )}
                                    {userEntries !== "overall" && (
                                        <RankGroup
                                            rank={comparedRank(
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
                    className={`${size[urlCardSize]} block ${
                        tier === "cardsQueue"
                            ? "swiper-no-swiping shadow-[0_0_16px_0] shadow-black md:opacity-0 md:hover:shadow-[0_0_16px_4px] md:group-hover:opacity-100"
                            : "mx-1 shadow-[0_8px_16px_-4px_rgba(0,0,0,1)]"
                    } relative aspect-[2/3] overflow-hidden rounded transition-all md:hover:scale-105 md:hover:shadow-purple-200`}
                >
                    {children}

                    <ResponsiveDialog
                        setIsOpen={setDialogIsOpen}
                        trigger={
                            <Poster
                                itemId={item.id}
                                boardType={board.type}
                                width={width()}
                                height={height()}
                            />
                        }
                        triggerClasses={`p-0 h-auto w-auto`}
                        component={
                            <InfoDialogContent item={item} appData={appData} />
                        }
                        footer={
                            <RemoveItemButton
                                infoItem={item}
                                appData={appData}
                                disabled={!allowedToRemoveItemFromBoard}
                                isDialog={true}
                            />
                        }
                        title={name}
                        backdrop={details.data.backdrop_path}
                        hideDescription={true}
                        hideTitle={true}
                    />
                </li>
            </ItemRankContext.Provider>
        )
}
