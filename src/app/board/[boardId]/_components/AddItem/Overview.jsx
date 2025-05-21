import { AppDataContext } from "@app/components/_providers/appDataProvider"
import { Button } from "@components/ui/button"
import { useContext } from "react"
import { useSetAtom } from "jotai"
import { selectedItemAtom } from "../../../../atoms"

export default function Details({ item }) {
    const { setDialogIsOpen } = useContext(AppDataContext)

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
