import { Button } from "@components/ui/button"
import { useSetAtom } from "jotai"
import { dialogIsOpenAtam, selectedItemAtom } from "../../../../atoms"

export default function Details({ item }) {
    const setDialogIsOpen = useSetAtom(dialogIsOpenAtam)

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
