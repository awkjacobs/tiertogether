import { EffectCards, Mousewheel } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/effect-cards"
import "swiper/css/mousewheel"
import SwiperCard from "../Cards/SwiperCard"
import { SortableContext, useSortable } from "@dnd-kit/sortable"
import { useMediaQuery } from "@app/hooks/use-media-query"

/**
 * Renders a swipeable, sortable card queue using Swiper and drag-and-drop integration.
 *
 * Displays each item in the {@link queue} as a card within a swipeable interface, supporting both desktop and mobile layouts. Enables drag-and-drop sorting and card-style transitions.
 *
 * @param {Object[]} queue - Array of items to display as swipeable cards.
 */
export default function SwiperZone({ queue }) {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const swiperDimensions = {
        width: isDesktop ? 460 : 230,
        height: isDesktop ? 240 : 120,
    }
    const { setNodeRef } = useSortable({
        id: "queue",
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
                                />
                            )}
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </SortableContext>
    )
}
