import Image from "next/image"

export default function Backdrop({ backdrop, fill, mobile }) {
    return (
        <div
            className={`${
                fill ? "h-auto" : mobile ? "h-52" : "h-64"
            } absolute inset-0 -z-10 w-full bg-zinc-900`}
        >
            {backdrop && (
                <Image
                    fill={true}
                    sizes="50vw, 33vw"
                    priority={true}
                    alt="Backdrop"
                    src={`http://image.tmdb.org/t/p/original${backdrop}`}
                    className={`-z-20 object-cover object-[0_25%] ${
                        mobile ? "rounded-t-md" : ""
                    }`}
                />
            )}
            <div
                className={`-z-10 h-full w-full bg-gradient-to-b from-backdrop-800/60 to-backdrop-900/70`}
            />
        </div>
    )
}
