import { cn } from "@lib/utils"
import { LoaderCircle } from "lucide-react"
import Image from "next/image"
import { useGetDetailsQuery } from "@app/hooks/use-get-fetch-query"
import MissingPoster from "@components/Utility/MissingPoster"
import { ITEM_ID_TYPE, POSTER_SOURCE } from "@lib/const"

export default function Poster({ itemId, width, height, className }) {
    console.log(itemId)
    const { id, type } = ITEM_ID_TYPE(itemId)
    const details = useGetDetailsQuery(id, type)

    if (
        !details.isLoading &&
        (details.data?.poster_path || details.data?.cover)
    )
        return (
            <Image
                src={POSTER_SOURCE(details.data, type)}
                width={width}
                height={height}
                alt={`${
                    details.data.name ? details.data.name : details.data.title
                } Poster`}
                className={cn(`h-auto w-auto rounded`, className)}
            />
        )
    if (
        !details.isLoading &&
        (!details.data?.poster_path || !details.data?.cover)
    )
        return (
            <MissingPoster className={cn(`h-auto w-auto rounded`, className)} />
        )
    return (
        <div
            className={cn(
                `flex aspect-[2/3] h-auto w-auto items-center justify-center rounded`,
                className,
            )}
        >
            <LoaderCircle className={`h-8 w-8 animate-spin text-purple-500`} />
        </div>
    )
}
