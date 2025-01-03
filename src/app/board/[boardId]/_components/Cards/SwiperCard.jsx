import Logo from "@app/board/[boardId]/_components/ItemDetails/Logo"
import { AppDataContext } from "@app/components/_providers/appDataProvider"
import {
    useGetCreditsQuery,
    useGetDetailsQuery,
} from "@app/hooks/use-get-fetch-query"
import Backdrop from "@components/ui/backdrop"
import { Skeleton } from "@components/ui/skeleton"
import MissingPoster from "@components/Utility/MissingPoster"
import { useDroppable } from "@dnd-kit/core"
import { BACKDROP_SOURCE, ITEM_ID_TYPE } from "@lib/const"
import Image from "next/image"
import { useContext, useEffect } from "react"
import { ItemAddRemoveButton } from "../Buttons/ItemAddRemoveButton"
import { SwiperCardDetails } from "./Card Components/SwiperCardDetails"
import Draggable from "./Draggable"

export default function SwiperCard(props) {
    const {
        index,
        item,
        tier,
        isActive,
        activeItem,
        isDesktop,
        setActiveCard,
        setActiveCardIndex,
        queueIsOpen,
    } = props

    const { appData } = useContext(AppDataContext)
    const { user, board } = appData
    const { active, isOver, setNodeRef } = useDroppable({
        id: tier + item.id,
        data: { type: "tier" },
    })
    const { id: itemId, type: itemType } = ITEM_ID_TYPE(item.id)
    const details = useGetDetailsQuery(itemId, itemType)
    const credits = useGetCreditsQuery(itemId, itemType)
    const backdrop = BACKDROP_SOURCE(item, itemType)

    const allowedToRemoveItemFromBoard =
        user.id === board.ownerId || user.id === item.addedBy.id

    useEffect(() => {
        if (isActive) {
            setActiveCard(item)
            setActiveCardIndex(index)
        }
    }, [isActive])

    if (details.isSuccess)
        return (
            <div
                className={`relative flex h-[120px] flex-row rounded-md md:h-60`}
            >
                <Backdrop backdrop={backdrop} fill={true} />
                {isActive && queueIsOpen && (
                    <ItemAddRemoveButton
                        item={item}
                        disabled={!allowedToRemoveItemFromBoard}
                    />
                )}
                <div
                    className={`group relative box-border flex h-[120px] min-w-20 items-center justify-center bg-black text-center md:h-auto ${itemType == "videoGame" ? "md:min-w-48" : "md:min-w-40"}`}
                >
                    {details.data.poster_path && (
                        <Image
                            fill={true}
                            sizes="50vw, 33vw"
                            priority={true}
                            alt="Backdrop"
                            src={`http://image.tmdb.org/t/p/w300${details.data.poster_path}`}
                            className={`h-auto w-auto bg-white object-cover object-[0_25%] opacity-35 blur-sm transition-all md:opacity-100 md:blur-none md:group-hover:opacity-35 md:group-hover:blur`}
                        />
                    )}
                    {details.data.cover?.image_id && (
                        <Image
                            fill={true}
                            sizes="50vw, 33vw"
                            priority={true}
                            alt="Backdrop"
                            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${details.data.cover?.image_id}.jpg`}
                            className={`h-auto w-auto bg-white object-cover opacity-35 blur-sm transition-all md:opacity-100 md:blur-none md:group-hover:opacity-35 md:group-hover:blur`}
                        />
                    )}
                    {!details.data.poster_path &&
                        !details.data.cover?.image_id && (
                            <MissingPoster className={`absolute`} />
                        )}
                    <Draggable
                        id={item.id}
                        key={item.id}
                        item={item}
                        tier={"cardsQueue"}
                        activeItem={activeItem}
                        active={active}
                        appData={appData}
                    ></Draggable>
                </div>
                <div
                    className={`flex w-full flex-col items-center gap-1 p-4 pt-10 transition-all md:items-stretch md:pt-6`}
                >
                    <Logo
                        itemId={itemId}
                        title={
                            details.data.name
                                ? details.data.name
                                : details.data.title
                        }
                        itemType={itemType}
                        swiper={true}
                    />
                    {isDesktop && (
                        <>
                            <div className={`flex-1`} />
                            {!details.isLoading && !credits.isLoading && (
                                <SwiperCardDetails item={item} />
                            )}
                        </>
                    )}
                </div>
            </div>
        )
    return (
        <div
            className={`relative flex h-[120px] flex-row rounded-md bg-zinc-200 md:h-60 dark:bg-zinc-950`}
        >
            <div
                className={`group relative box-border flex h-[120px] min-w-20 items-center justify-center bg-black text-center md:h-auto md:min-w-40`}
            >
                <Skeleton className={`h-full w-full`} />
            </div>
            <div
                className={`flex w-full flex-col items-center gap-1 p-4 pt-10 transition-all md:items-stretch md:pt-6`}
            >
                <Skeleton
                    className={`col-start-1 h-24 max-w-full justify-self-center object-contain md:col-start-2 md:col-end-4 md:max-h-36 md:max-w-[70%] md:justify-self-start`}
                />
                {isDesktop && (
                    <>
                        <div className={`flex-1`} />
                        <div
                            className={`relative grid grid-cols-[auto_1fr] gap-1 rounded bg-surface-900/60 p-2 text-xs text-purple-50`}
                        >
                            <Skeleton
                                className={`col-start-1 col-end-3 grid h-4 grid-cols-subgrid`}
                            />
                            <Skeleton
                                className={`col-start-1 col-end-3 grid h-4 grid-cols-subgrid`}
                            />
                            <Skeleton
                                className={`col-start-1 col-end-3 grid h-4 grid-cols-subgrid`}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
