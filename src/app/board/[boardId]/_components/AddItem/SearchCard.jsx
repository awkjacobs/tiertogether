import { PRISMA_ADD_ITEM } from "@api/prismaFuncs"
import { GenreBadge, ReleaseBadge } from "@app/components/Utility/Badges"
import { useGetDetailsQuery } from "@app/hooks/use-get-fetch-query"
import { useMediaQuery } from "@app/hooks/use-media-query"
import { Form } from "@components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { itemType } from "@lib/const"
import { Check, LoaderCircle, Plus } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "../../../../components/ui/button"
import InfoCard from "../Cards/InfoCard"
import Overview from "./Overview"
import SearchCardContainer from "./SearchCardContainer"
import { SearchLogo } from "./SearchLogo"

const formSchema = z.object({})

export default function SearchCard({ item, board, type, queryType, style }) {
    const [alreadyIncluded, setAlreadyIncluded] = useState(
        board.items.some((boardItem) => boardItem.id === item.id),
    )
    const name = item?.name ? item.name : item.title

    item.type = itemType(board, queryType)

    const backdropSource = `http://image.tmdb.org/t/p/original${item.backdrop_path}`

    const isDesktop = useMediaQuery("(min-width: 768px)")

    const form = useForm({
        resolver: zodResolver(formSchema),
    })

    async function handleAdd() {
        if (alreadyIncluded) return

        let content = `${name} added to ${board.boardName}`

        let runFinally = true
        await PRISMA_ADD_ITEM(
            board,
            {
                id: item.id,
                backdrop_path: item.backdrop_path,
                type: item.type,
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
    const details = useGetDetailsQuery(item.id, item.type)

    return (
        <SearchCardContainer
            style={style}
            backdropSource={backdropSource}
            className={`overflow-hidden`}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAdd)}>
                    <Button
                        className={`absolute right-1 top-1 h-8 w-8 p-1 text-zinc-100/70 hover:text-zinc-100 md:left-1 dark:text-zinc-100/70 dark:hover:text-zinc-100 ${
                            !alreadyIncluded
                                ? "bg-zinc-950/70 hover:bg-zinc-950 dark:bg-zinc-950/70 dark:hover:bg-zinc-950"
                                : "bg-emerald-500 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-500"
                        } `}
                        size="icon"
                        type="submit"
                        disabled={details.isLoading}
                    >
                        {form.formState.isSubmitting && (
                            <LoaderCircle className="animate-spin" />
                        )}
                        {!form.formState.isSubmitting && !alreadyIncluded && (
                            <Plus />
                        )}
                        {!form.formState.isSubmitting && alreadyIncluded && (
                            <Check />
                        )}
                    </Button>
                </form>
            </Form>

            <InfoCard
                item={item}
                itemType={item.type}
                size={{ height: 240, width: 120 }}
                searchOrCollection={"search"}
            />

            <div
                className={`flex min-w-[50%] flex-1 flex-col justify-between p-4 pb-0 md:p-6 md:pb-4`}
            >
                <SearchLogo itemId={item.id} title={name} type={item.type} />
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
                            alreadyIncluded={alreadyIncluded}
                            handleAdd={handleAdd}
                        />
                    </div>
                )}
                {!isDesktop && (
                    <Overview
                        isDesktop={isDesktop}
                        item={item}
                        alreadyIncluded={alreadyIncluded}
                        handleAdd={handleAdd}
                    />
                )}
            </div>
        </SearchCardContainer>
    )
}
