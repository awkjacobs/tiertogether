import { EffectCards, Mousewheel } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/effect-cards"
import "swiper/css/mousewheel"
import SwiperCard from "../Cards/SwiperCard"
import { SortableContext, useSortable } from "@dnd-kit/sortable"
import { useMediaQuery } from "@app/hooks/use-media-query"

export default function SwiperZone(props) {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const { tier, queue } = props

    const swiperDimensions = {
        width: isDesktop ? 460 : 230,
        height: isDesktop ? 240 : 120,
    }
    const { active, isOver, setNodeRef } = useSortable({
        id: tier,
        data: { type: "tier" },
    })
    return (
        <SortableContext items={queue} id={"cardsQueue"}>
            <Swiper
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards, Mousewheel]}
                mousewheel={{ enabled: true }}
                loop={queue.length > 1}
                className="mySwiper"
                style={{
                    width: swiperDimensions.width,
                    height: swiperDimensions.height,
                }}
                ref={setNodeRef}
            >
                {queue.map((item) => {
                    return (
                        <SwiperSlide key={item.id}>
                            {({ isActive }) => (
                                <SwiperCard
                                    id={item.id}
                                    key={item.id}
                                    item={item}
                                    tier={"cardsQueue"}
                                    isActive={isActive}
                                    isDesktop={isDesktop}
                                    {...props}
                                />
                            )}
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </SortableContext>
    )
}
