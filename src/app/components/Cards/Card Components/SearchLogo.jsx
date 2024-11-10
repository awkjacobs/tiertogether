import Image from "next/image"
import { motion } from "framer-motion"
import { useQuery } from "@tanstack/react-query"
import { TMDB_GET_IMAGES } from "@/lib/movieFuncs"
import CardTitle from "./SearchCardTitle"
import { findLogo } from "@/lib/utils"

export function SearchLogo({ itemId, title, type }) {
    const images = useQuery({
        queryKey: ["logo", itemId],
        queryFn: () => TMDB_GET_IMAGES(itemId, type === "anime" ? "tv" : type),
    })
    const logo = findLogo(images.data)

    if (logo)
        return (
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 100 }}
            >
                <Image
                    className={
                        "max-h-12 max-w-[100%] object-contain md:max-h-24 md:max-w-[70%]"
                    }
                    src={`http://image.tmdb.org/t/p/original${logo}`}
                    width={700}
                    height={128}
                    alt="Logo"
                />
            </motion.div>
        )
    return <CardTitle title={title} />
}
