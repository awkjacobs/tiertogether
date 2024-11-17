import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip"
import Poster from "../ui/Poster"
import { ResponsiveDialog } from "../ui/ResponsiveDialog"
import InfoDialogContent from "../Dialogs/Dialog Modules/InfoDialogContent"
import { RemoveItemButton } from "../Buttons/RemoveItemButton"
import { useMediaQuery } from "@/app/hooks/use-media-query"
import { scoreDif } from "@/lib/const"
import { RankGroup, RankOverall } from "../Utility/RankGroup"
import { useSearchParams } from "next/navigation"
import { LoaderCircle } from "lucide-react"
import { useGetDetailsQuery } from "@/app/hooks/use-get-fetch-query"

const size = {
    null: "w-10 md:w-16",
    1: "w-10 md:w-16",
    2: "w-16 md:w-20",
    3: "w-20 md:w-24",
}

export function Card({
    item,
    children,
    isDragging,
    appData,
    tier,
    activeItem,
    setDialogIsOpen,
    vsScore = false,
}) {
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

    const difference = scoreDif(vsScore)
    const userRank = item.rank.find((rank) => rank.userId === appData.user.id)
    userRank.name = appData.user.name
    userRank.id = userRank.userId

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
                className={`${size[urlCardSize]} relative mx-1 block aspect-[2/3] w-32 overflow-hidden shadow-[4px_8px_16px_-4px_rgba(0,0,0,1)] ${
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
            <TooltipProvider delayDuration={tier === "cardsQueue" ? 9999 : 100}>
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
                                        disabled={!allowedToRemoveItemFromBoard}
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
                                <RankOverall
                                    appData={appData}
                                    averageRank={item.averageRank}
                                />
                                <RankGroup appData={appData} rank={userRank} />
                            </RankingsTooltipDisplay>
                        </TooltipContent>
                    )}
                </Tooltip>
            </TooltipProvider>
        )
    if (!activeItem && !isDesktop)
        return (
            <li
                className={`${size[urlCardSize]} block ${
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
                {children}
            </li>
        )
}
function RankingsTooltipDisplay({ difference, children }) {
    return (
        <div className={`space-y-2`}>
            {difference === "higher" && (
                <>
                    Board average is{" "}
                    <b>
                        <i>HIGHER</i>
                    </b>{" "}
                    than your rating
                </>
            )}
            {difference === "equals" && (
                <>
                    Board average is{" "}
                    <b>
                        <i>EQUAL</i>
                    </b>{" "}
                    to your rating
                </>
            )}
            {difference === "lower" && (
                <>
                    Board average is{" "}
                    <b>
                        <i>LOWER</i>
                    </b>{" "}
                    than your rating
                </>
            )}

            <div
                className={`space-y-2 rounded border border-zinc-300 p-2 dark:border-zinc-800`}
            >
                {children}
            </div>
        </div>
    )
}
