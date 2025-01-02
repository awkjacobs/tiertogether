import { AppDataContext } from "@app/components/_providers/appDataProvider"
import { ItemDataContext } from "@app/components/_providers/itemDataProvider"
import Backdrop from "@app/components/ui/backdrop"
import { useGetDetailsQuery } from "@app/hooks/use-get-fetch-query"
import { useMediaQuery } from "@app/hooks/use-media-query"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
} from "@components/ui/dialog"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@components/ui/drawer"
import { BACKDROP_SOURCE, ITEM_ID_TYPE } from "@lib/const"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import { useContext } from "react"
import { ItemAddRemoveButton } from "../Buttons/ItemAddRemoveButton"
import InfoDialogContent from "./InfoDialogContent"

export default function InfoDialog({ isOpen, setIsOpen }) {
    const { appData, selectedItem } = useContext(AppDataContext)
    const { board } = appData

    const isDesktop = useMediaQuery("(min-width: 768px)")

    const { id: itemId, type: itemType } = ITEM_ID_TYPE(selectedItem)

    const details = useGetDetailsQuery(itemId, itemType)

    const item = board.items.find((boardItem) => boardItem.id === selectedItem)
        ? board.items.find((boardItem) => boardItem.id === selectedItem)
        : details.data

    const name = details.data?.name ? details.data?.name : details.data?.title

    const backdrop = BACKDROP_SOURCE(item, itemType)

    if (typeof item?.id === "number") {
        let numId = item.id
        item.id = `${numId}-${itemType}`
    }

    if (isDesktop) {
        return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <ItemDataContext.Provider
                    value={{
                        itemId,
                        itemType,
                        details,
                    }}
                >
                    <DialogContent
                        onOpenAutoFocus={(event) => {
                            event.preventDefault()
                        }}
                        className={`max-w-fit grid-rows-1 overflow-clip p-12`}
                    >
                        <VisuallyHidden.Root>
                            <DialogTitle>{name}</DialogTitle>
                            <DialogDescription>{`${name} Information`}</DialogDescription>
                        </VisuallyHidden.Root>
                        {backdrop && <Backdrop backdrop={backdrop} />}
                        <InfoDialogContent item={item} />
                        <DialogFooter className={`md:justify-center`}>
                            <ItemAddRemoveButton
                                item={item}
                                itemType={itemType}
                                isDialog={true}
                            />
                        </DialogFooter>
                    </DialogContent>
                </ItemDataContext.Provider>
            </Dialog>
        )
    }
    if (!isDesktop) {
        return (
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <ItemDataContext.Provider value={{ itemId, itemType, details }}>
                    <DrawerContent
                        className={`fixed bottom-0 h-[100svh] max-h-[100svh]`}
                    >
                        <DrawerHeader className="text-left">
                            {backdrop && (
                                <Backdrop backdrop={backdrop} mobile={true} />
                            )}

                            <VisuallyHidden.Root>
                                <DrawerTitle>{name}</DrawerTitle>
                                <DrawerDescription>{`${name} Information`}</DrawerDescription>
                            </VisuallyHidden.Root>
                        </DrawerHeader>
                        <InfoDialogContent item={item} />
                        <DrawerFooter className="bottom-0 pt-2">
                            <ItemAddRemoveButton
                                item={item}
                                details={details}
                                isDialog={true}
                            />
                        </DrawerFooter>
                    </DrawerContent>
                </ItemDataContext.Provider>
            </Drawer>
        )
    }
}
