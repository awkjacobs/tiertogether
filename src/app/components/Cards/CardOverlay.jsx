import { useMediaQuery } from "@/app/hooks/use-media-query"
import { motion } from "framer-motion"
import Poster from "../ui/Poster"
import { useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { LoaderCircle } from "lucide-react"

const size = {
    null: "w-10 md:w-16",
    1: "w-10 md:w-16",
    2: "w-16 md:w-20",
    3: "w-20 md:w-24",
}

export function CardOverlay({ item, board }) {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    // const posterUrls = useQuery({
    //     queryKey: ["posterUrls", board.id],
    //     queryFn: () => getPosterUrls(board.items),
    // })

    const searchParams = useSearchParams()
    const urlCardSize = searchParams.get("cardSize")

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

    // if (posterUrls.isLoading)
    //     return (
    //         <div className={`bg-zinc-900`}>
    //             <LoaderCircle className={`h-full w-full animate-spin`} />
    //         </div>
    //     )

    return (
        <motion.div
            className={`${size[urlCardSize]} relative block aspect-[2/3] rounded shadow-[4px_8px_30px_-10px_rgba(0,0,0,1)]`}
            initial={{ scale: 1, rotate: 0 }}
            animate={{ scale: 1.25, rotate: 10 }}
        >
            <Poster
                // source={posterUrls.data.get(item.id)}
                itemId={item.id}
                boardType={board.type}
                width={width()}
                height={height()}
            />
        </motion.div>
    )
}
