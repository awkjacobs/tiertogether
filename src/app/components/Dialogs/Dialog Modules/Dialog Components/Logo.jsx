import CardTitle from "@/app/components/Cards/Card Components/CardTitle"
import { useGetImagesQuery } from "@/app/hooks/use-get-fetch-query"
import { findLogo } from "@/lib/utils"
import Image from "next/image"

export default function Logo({ itemId, title, type, swiper = false }) {
    const images = useGetImagesQuery(itemId, type)
    const logo = findLogo(images.data)

    if (!images.isLoading && logo)
        return (
            <div
                className={`col-start-1 justify-self-center md:col-start-2 md:col-end-4 md:justify-self-start`}
            >
                <Image
                    className={`max-w-full object-contain ${swiper ? "max-h-16 md:max-h-24" : "max-h-24 md:max-h-36 md:max-w-[70%]"}`}
                    width={700}
                    height={144}
                    alt="Logo"
                    src={`http://image.tmdb.org/t/p/original${logo}`}
                />
            </div>
        )
    return (
        <div
            className={`col-start-1 justify-self-center md:col-start-2 md:col-end-4 md:justify-self-start`}
        >
            <CardTitle title={title} />
        </div>
    )
}
