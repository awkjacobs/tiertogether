import { GenreBadge, ReleaseBadge } from "@/app/components/Utility/Badges"
import { useMediaQuery } from "@/app/hooks/use-media-query"
import { PRISMA_ADD_ITEM } from "@prismaFuncs/prismaFuncs"
import { Check, Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "../ui/button"
import Poster from "../ui/Poster"
import Overview from "./Card Components/Overview"
import SearchCardContainer from "./Card Components/SearchCardContainer"
import { SearchLogo } from "./Card Components/SearchLogo"
import { itemType } from "@/lib/const"
import { useGetDetailsQuery } from "@/app/hooks/use-get-fetch-query"

export default function SearchCard({ item, board, type, queryType, style }) {
    const [alreadyIncluded, setAlreadyIncluded] = useState(
        board.items.some((boardItem) => boardItem.id === item.id),
    )
    const name = item?.name ? item.name : item.title

    const backdropSource = `http://image.tmdb.org/t/p/original${item.backdrop_path}`

    const isDesktop = useMediaQuery("(min-width: 768px)")

    async function handleAdd() {
        if (alreadyIncluded) return

        let content = `${name} added to ${board.boardName}`

        let runFinally = true
        await PRISMA_ADD_ITEM(
            board,
            {
                id: item.id,
                backdrop_path: item.backdrop_path,
                type: itemType(board, queryType),
            },
            content,
            "itemAdded",
        )
            .catch((err) => {
                if (err) runFinally = false
                console.error(err)
            })
            .finally(() => {
                if (!runFinally) return
                setAlreadyIncluded(true)

                toast(content, {
                    action: {
                        label: "Close",
                        onClick: () => null,
                    },
                })
            })
    }
    const details = useGetDetailsQuery(item.id, type)

    return (
        <SearchCardContainer
            style={style}
            backdropSource={backdropSource}
            className={`overflow-hidden`}
        >
            <Button
                className={`absolute h-4 w-4 p-1 text-zinc-100/70 hover:text-zinc-100 md:left-1 md:top-1 md:h-6 md:w-6 dark:text-zinc-100/70 dark:hover:text-zinc-100 ${
                    !alreadyIncluded
                        ? "bg-zinc-950/70 hover:bg-zinc-950 dark:bg-zinc-950/70 dark:hover:bg-zinc-950"
                        : "bg-emerald-500 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-500"
                } `}
                size="icon"
                onClick={handleAdd}
                disabled={details.isLoading}
            >
                {!alreadyIncluded ? <Plus /> : <Check />}
            </Button>
            <Poster
                itemId={item.id}
                boardType={board.type}
                height={240}
                width={120}
            />

            <div
                className={`flex min-w-[50%] flex-1 flex-col justify-between p-4 pb-0 md:p-6 md:pb-4`}
            >
                <SearchLogo itemId={item.id} title={name} type={type} />
                {isDesktop && (
                    <div className={`flex items-center justify-between`}>
                        <div className={`flex flex-wrap items-center gap-2`}>
                            <ReleaseBadge
                                release={
                                    item.release_date
                                        ? [item.release_date]
                                        : [
                                              item.first_air_date,
                                              details?.data?.last_air_date,
                                          ]
                                }
                            />
                            {item.genre_ids &&
                                item.genre_ids.map((id) => (
                                    <GenreBadge
                                        genreId={id}
                                        key={id}
                                        className={`text-purple-50`}
                                    />
                                ))}
                        </div>
                        <Overview
                            isDesktop={isDesktop}
                            item={item}
                            type={type}
                            queryType={queryType}
                            alreadyIncluded={alreadyIncluded}
                            handleAdd={handleAdd}
                        />
                    </div>
                )}
                {!isDesktop && (
                    <Overview
                        isDesktop={isDesktop}
                        item={item}
                        type={type}
                        queryType={queryType}
                        alreadyIncluded={alreadyIncluded}
                        handleAdd={handleAdd}
                    />
                )}
            </div>
        </SearchCardContainer>
    )
}
