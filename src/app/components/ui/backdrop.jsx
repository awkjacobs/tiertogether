import Image from "next/image"

export default function Backdrop({ backdrop, fill, mobile }) {
    return (
        <div
            className={`${
                fill ? "h-auto" : mobile ? "h-52" : "h-64"
            }  absolute w-full inset-0 -z-10 bg-zinc-900`}
        >
            {backdrop && (
                <Image
                    fill={true}
                    sizes="50vw, 33vw"
                    priority={true}
                    alt="Backdrop"
                    src={`http://image.tmdb.org/t/p/original${backdrop}`}
                    className={`object-cover object-[0_25%] -z-20 ${
                        mobile ? "rounded-t-md" : ""
                    }`}
                />
            )}
            <div
                className={`w-full h-full bg-gradient-to-b from-backdrop-800/60 to-backdrop-900/70 -z-10`}
            />
        </div>
    )
}
