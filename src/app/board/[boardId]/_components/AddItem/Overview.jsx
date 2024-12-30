import { AppDataContext } from "@app/components/_providers/appDataProvider"
import { Button } from "@components/ui/button"
import { useContext } from "react"

export default function Overview({ item }) {
    const { setDialogIsOpen, setSelectedItem } = useContext(AppDataContext)

    const handleSelect = () => {
        setDialogIsOpen(true)
        setSelectedItem(`${item.id}xx${item.type}`)
    }

    return (
        <Button variant="ghost" onClick={handleSelect}>
            Details
        </Button>
    )
}
