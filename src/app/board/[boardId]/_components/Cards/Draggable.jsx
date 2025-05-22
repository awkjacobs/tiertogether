import { useSortable } from "@dnd-kit/sortable"
import { Card } from "./Card"

export default function Draggable(props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: props.id,
        data: {
            index: props.index,
            type: "card",
            tier: props.tier,
            item: props.item,
        },
    })
    const style = transform
        ? {
              transition,
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <Card {...props} isDragging={isDragging} />
        </div>
    )
}
