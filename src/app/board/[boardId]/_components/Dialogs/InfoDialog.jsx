import { useMediaQuery } from "@app/hooks/use-media-query"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@components/ui/dialog"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@components/ui/drawer"
import InfoDialogContent from "./InfoDialogContent"
import { useContext } from "react"
import { useSearchParams } from "next/navigation"
import {
    useGetCreditsQuery,
    useGetDetailsQuery,
} from "@app/hooks/use-get-fetch-query"
import { AppDataContext } from "@app/components/_providers/appDataProvider"
import { RemoveItemButton } from "../Buttons/RemoveItemButton"
import { backdropSource } from "@lib/const"
import Backdrop from "@app/components/ui/backdrop"

export default function InfoDialog({ isOpen, setIsOpen }) {
    const { appData } = useContext(AppDataContext)
    const { board } = appData

    const isDesktop = useMediaQuery("(min-width: 768px)")

    const searchParams = useSearchParams()
    const urlItem = searchParams.get("sel")

    const itemId = Number(urlItem?.split("xx")[0])
    const itemType = urlItem?.split("xx")[1]

    const item = board.items.find((item) => item.id === itemId)

    const details = useGetDetailsQuery(itemId, itemType)
    const credits = useGetCreditsQuery(itemId, itemType)
    const name = details.data?.name ? details.data?.name : details.data?.title

    const backdrop = backdropSource(item, itemType)
    if (isDesktop) {
        return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent
                    onOpenAutoFocus={(event) => {
                        event.preventDefault()
                    }}
                    className={`flex max-w-screen-lg flex-col overflow-hidden`}
                >
                    <DialogHeader
                        className={backdrop && `min-h-0 overflow-hidden`}
                    >
                        {backdrop && <Backdrop backdrop={backdrop} />}
                        <VisuallyHidden.Root>
                            <DialogTitle>{name}</DialogTitle>
                            <DialogDescription>{`${name} Information`}</DialogDescription>
                        </VisuallyHidden.Root>
                    </DialogHeader>
                    <InfoDialogContent item={item} details={details} />
                    <DialogFooter>
                        <RemoveItemButton
                            item={item}
                            details={details}
                            isDialog={true}
                        />
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }
    if (!isDesktop) {
        return (
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
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
                    <InfoDialogContent item={item} details={details} />
                    <DrawerFooter className="bottom-0 pt-2">
                        <RemoveItemButton
                            item={item}
                            details={details}
                            isDialog={true}
                        />
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
    }
}
