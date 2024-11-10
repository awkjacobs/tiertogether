import Image from "next/image"

export default function SwiperLogo({ logo, queueIsOpen }) {
    const logoSource = `http://image.tmdb.org/t/p/original${logo}`

    return (
        <Image
            className={`max-h-16 md:max-h-24 w-auto object-contain transition-all pb-4 flex-1`}
            src={logoSource}
            width={400}
            height={72}
            alt="Logo"
        />
    )
}
