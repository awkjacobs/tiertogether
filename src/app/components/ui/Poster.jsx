import { cn } from "@lib/utils"
import { LoaderCircle } from "lucide-react"
import Image from "next/image"
import { useGetDetailsQuery } from "@app/hooks/use-get-fetch-query"
import MissingPoster from "../Utility/MissingPoster"
import { posterSource } from "@lib/const"

export default function Poster({ itemId, itemType, width, height, className }) {
    const details = useGetDetailsQuery(itemId, itemType)

    if (
        !details.isLoading &&
        (details.data?.poster_path || details.data?.cover)
    )
        return (
            <Image
                src={posterSource(details.data, itemType)}
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
