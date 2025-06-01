import { useSortable } from "@dnd-kit/sortable"
import { Card } from "./Card"

/**
 * Renders a draggable card component with sortable functionality.
 *
 * Integrates with the dnd-kit sortable system to enable drag-and-drop sorting for the provided item.
 * Passes drag state and sortable props to the underlying {@link Card} component.
 *
 * @returns {JSX.Element} A div wrapping the card, configured for drag-and-drop sorting.
 */
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
