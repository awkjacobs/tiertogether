import { useDroppable } from "@dnd-kit/core"
import Image from "next/image"
import { useEffect } from "react"
import { RemoveItemButton } from "../Buttons/RemoveItemButton"
import Backdrop from "../ui/backdrop"
import { SwiperCardDetails } from "./Card Components/SwiperCardDetails"
import Draggable from "./Draggable"
import { convertDate } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { TMDB_GET_CREDITS, TMDB_GET_DETAILS } from "@/lib/movieFuncs"
import MissingPoster from "../Utility/MissingPoster"
import Logo from "../Dialogs/Dialog Modules/Dialog Components/Logo"
import { Skeleton } from "@/components/ui/skeleton"
import { findDirectors } from "../Utility/findDirectors"
// TODO - change mobile formating, maybe just poster

export default function SwiperCard(props) {
    const {
        appData,
        index,
        item,
        tier,
        isActive,
        activeItem,
        isDesktop,
        setActiveCard,
        setActiveCardIndex,
        queueIsOpen,
        board,
    } = props

    const { active, isOver, setNodeRef } = useDroppable({
        id: tier + item.id,
        data: { type: "tier" },
    })

    const details = useQuery({
        queryKey: ["details", item.id],
        queryFn: () => TMDB_GET_DETAILS(item.id, board.type),
    })
    const credits = useQuery({
        queryKey: ["credits", item.id],
        queryFn: () => TMDB_GET_CREDITS(item.id, board.type),
    })

    const allowedToRemoveItemFromBoard = appData.boardOwner
        ? true
        : appData.user.id === item.addedBy.id
          ? true
          : false

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
                <Backdrop
                    backdrop={details.data.backdrop_path}
                    fill={true}
                    swiper={true}
                />
                {isActive && queueIsOpen && (
                    <RemoveItemButton
                        infoItem={item}
                        appData={appData}
                        disabled={!allowedToRemoveItemFromBoard}
                    />
                )}
                <div
                    className={`group relative box-border flex h-[120px] min-w-20 items-center justify-center bg-black text-center md:h-auto md:min-w-40`}
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
                    {!details.data.poster_path && (
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
                        itemId={item.id}
                        title={
                            details.data.name
                                ? details.data.name
                                : details.data.title
                        }
                        type={board.type}
                        swiper={true}
                    />
                    {isDesktop && (
                        <>
                            <div className={`flex-1`} />
                            {!details.isLoading && !credits.isLoading && (
                                <SwiperCardDetails
                                    type={board.type}
                                    date={
                                        details.data.release_date
                                            ? convertDate(
                                                  details.data.release_date,
                                              )
                                            : convertDate(
                                                  details.data.first_air_date,
                                              ) +
                                              " - " +
                                              convertDate(
                                                  details.data.last_air_date,
                                              )
                                    }
                                    directors={
                                        board.type === "movie"
                                            ? findDirectors(credits.data)
                                            : null
                                    }
                                    seasons={details.data.number_of_seasons}
                                    episodes={details.data.number_of_episodes}
                                    status={details.data.status}
                                />
                            )}
                            {(details.isLoading || credits.isLoading) && (
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
