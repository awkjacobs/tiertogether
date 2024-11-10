import Image from "next/image"

export default function Backdrop({ backdrop }) {
    return (
        <div className={`w-full h-64 -z-20 object-cover absolute `}>
            <Image
                fill={true}
                alt="Logo"
                src={`http://image.tmdb.org/t/p/original${backdrop}`}
                className={`object-cover -z-20`}
            />
            <div
                className={`w-full h-64 -z-10 bg-gradient-to-b from-purple-950/60 to-purple-950/70`}
            />
        </div>
    )
}
