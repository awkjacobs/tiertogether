import { Button } from "@components/ui/button"
import { useSetAtom } from "jotai"
import { dialogIsOpenAtom, selectedItemAtom } from "../../../../atoms"

/**
 * Renders a button that, when clicked, opens a dialog and marks the given item as selected.
 *
 * @param {{ item: { id: string | number } }} props - The item to display details for.
 */
export default function Details({ item }) {
    const setDialogIsOpen = useSetAtom(dialogIsOpenAtom)

    const setSelectedItem = useSetAtom(selectedItemAtom)

    const handleSelect = () => {
        setDialogIsOpen(true)
        setSelectedItem(item.id)
    }

    return (
        <Button variant="ghost" onClick={handleSelect}>
            Details
        </Button>
    )
}
