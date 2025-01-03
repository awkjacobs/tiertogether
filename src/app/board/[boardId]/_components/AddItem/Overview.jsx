import { AppDataContext } from "@app/components/_providers/appDataProvider"
import { Button } from "@components/ui/button"
import { useContext } from "react"

export default function Details({ item }) {
    const { setDialogIsOpen, setSelectedItem } = useContext(AppDataContext)

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
