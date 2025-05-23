import Image from "next/image"
import { motion } from "motion/react"
import CardTitle from "../ItemDetails/CardTitle"
import { FIND_LOGO } from "@lib/const"
import { useGetImagesQuery } from "@app/hooks/use-get-fetch-query"

export function SearchLogo({ itemId, title, type }) {
    const images = useGetImagesQuery(itemId, type)
    const logo = FIND_LOGO(images.data)

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
                    alt={title}
                />
            </motion.div>
        )
    return <CardTitle title={title} />
}
