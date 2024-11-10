import { cn } from "@/lib/utils"
import Image from "next/image"

export default function Poster({ source, width, height, className }) {
    return (
        <Image
            src={`http://image.tmdb.org/t/p/w300${source}`}
            width={width}
            height={height}
            alt="Poster Image"
            className={cn(`h-auto w-auto rounded`, className)}
        />
    )
}
