import { Button } from "@components/ui/button"
import { useSetAtom } from "jotai"
import { dialogIsOpenAtom, selectedItemAtom } from "../../../../atoms"

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
