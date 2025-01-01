import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import EditBoardButton from "@components/Buttons/EditBoardButton"
import { motion } from "motion/react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/effect-fade"
import { Autoplay, EffectFade } from "swiper/modules"
import Crown from "@app/components/Utility/Crown"
import { BACKDROP_SOURCE } from "@lib/const"
import BoardTypeIcon from "@components/Utility/BoardTypeIcons"

export default function BoardCard({ board, appData, index }) {
    const { user } = appData
    const isOwner = user.id === board.owner.id

    const [boardName, setNewBoardName] = useState(board.boardName)

    const boardItemsBackdrops = board.items
        .flatMap((item) => BACKDROP_SOURCE(item, item.id.split("-")[1]))
        .filter((item) => item !== null && item !== undefined)

    return (
        <motion.div
            whileHover={{
                scale: 1.1,
                zIndex: 99,
            }}
            layout
            className={`relative flex h-48 min-w-60 max-w-xl flex-1 cursor-pointer flex-col overflow-hidden rounded-md bg-surface-100 shadow-lg drop-shadow-lg transition-[shadow] hover:shadow-purple-900/70`}
        >
            <div
                className={`absolute z-30 flex flex-col items-center gap-2 p-2`}
            >
                <BoardTypeIcon type={board.type} />
                {isOwner && <Crown />}
            </div>
            <Link
                href={`board/${board.id}`}
                prefetch={true}
                className={`group relative flex h-48 flex-1 cursor-pointer flex-col items-center justify-center bg-surface-950 object-cover`}
                passHref
            >
                {boardItemsBackdrops.length > 0 && (
                    <CrossFade
                        backgrounds={boardItemsBackdrops}
                        index={index}
                    />
                )}
                <div
                    className={`${
                        boardItemsBackdrops.length > 0
                            ? "bg-purple-300"
                            : "bg-purple-500"
                    } absolute z-10 h-full w-full bg-cover bg-blend-luminosity mix-blend-multiply transition-all duration-300`}
                ></div>

                <h2
                    className={`z-20 text-center text-2xl font-semibold text-purple-500 mix-blend-plus-lighter transition-colors group-hover:text-purple-100`}
                >
                    {boardName.toUpperCase()}
                </h2>
            </Link>
            <EditBoardButton
                board={board}
                boardName={boardName}
                setNewBoardName={setNewBoardName}
                triggerClasses={`absolute right-0 hover:bg-purple-500/30 active:bg-purple-400/20 dark:hover:bg-purple-400/10 z-30`}
                iconClasses={`text-purple-200`}
                appData={appData}
                isOwner={isOwner}
            />
        </motion.div>
    )
}
function CrossFade({ backgrounds, index }) {
    const swiperIndex = index
    console.log(backgrounds)
    return (
        <Swiper
            effect={"fade"}
            modules={[EffectFade, Autoplay]}
            autoplay={{
                delay: 10000,
            }}
            loop={true}
            className="mySwiper"
            style={{
                width: "100%",
                height: "100%",
                mixBlendMode: "luminosity",
                filter: "grayscale",
                objectFit: "cover",
                position: "absolute",
                border: 0,
            }}
        >
            {backgrounds.map((background, index) => {
                return (
                    <SwiperSlide
                        key={index}
                        style={{ border: 0 }}
                        data-swiper-autoplay={
                            index === 0 ? 10000 + swiperIndex * 1000 : false
                        }
                    >
                        {() => (
                            <Image
                                src={background.fullPath}
                                fill={true}
                                sizes="33vw"
                                priority={true}
                                alt="Board Card Background"
                                style={{ objectFit: "cover" }}
                            />
                        )}
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}
