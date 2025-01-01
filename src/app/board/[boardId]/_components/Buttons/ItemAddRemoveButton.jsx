import { AppDataContext } from "@app/components/_providers/appDataProvider"
import { Button } from "@app/components/ui/button"
import { useGetDetailsQuery } from "@app/hooks/use-get-fetch-query"
import { DIALOG_BUTTON_STYLE, ITEM_ID_TYPE } from "@lib/const"
import { LoaderCircle } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import AddItemButton from "./AddItemButton"
import RemoveItemButton from "./RemoveItemButton"

export function ItemAddRemoveButton({ item, disabled, isDialog = false }) {
    const { appData } = useContext(AppDataContext)
    const { board } = appData

    const { id: itemId, type: itemType } = ITEM_ID_TYPE(item.id)

    const details = useGetDetailsQuery(itemId, itemType)
    const name = details?.data?.name
        ? details?.data?.name
        : details?.data?.title

    const [alreadyIncluded, setAlreadyIncluded] = useState(
        board.items.some((boardItem) => boardItem.id == item?.id),
    )

    useEffect(() => {
        if (item)
            setAlreadyIncluded(
                board.items.some((boardItem) => boardItem.id == item?.id),
            )
    }, [item])

    if (details?.isLoading)
        return (
            <Button disabled={true} className={DIALOG_BUTTON_STYLE[isDialog]}>
                <LoaderCircle className={`mr-2 h-4 w-4 animate-spin`} />
                {isDialog && <p>Loading...</p>}
            </Button>
        )
    if (!details?.isLoading && !alreadyIncluded)
        return <AddItemButton item={item} disabled={disabled} />

    if (!details?.isLoading && alreadyIncluded)
        return (
            <RemoveItemButton
                disabled={disabled}
                item={item}
                name={name}
                isDialog={isDialog}
            />
        )
}
