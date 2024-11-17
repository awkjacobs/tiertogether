import { cn } from "@/lib/utils"
import { LoaderCircle } from "lucide-react"
import Image from "next/image"
import { useGetDetailsQuery } from "@/app/hooks/use-get-fetch-query"
import MissingPoster from "../Utility/MissingPoster"

export default function Poster({
    itemId,
    boardType,
    width,
    height,
    className,
}) {
    const details = useGetDetailsQuery(itemId, boardType)

    if (!details.isLoading && details.data.poster_path)
        return (
            <Image
                src={`http://image.tmdb.org/t/p/w300${details.data.poster_path}`}
                width={width}
                height={height}
                alt="Poster Image"
                className={cn(`h-auto w-auto rounded`, className)}
            />
        )
    if (!details.isLoading && !details.data.poster_path)
        return <MissingPoster />
    return <LoaderCircle className={`h-8 w-8 animate-spin text-purple-500`} />
}
