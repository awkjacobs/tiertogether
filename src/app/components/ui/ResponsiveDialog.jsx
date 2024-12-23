import { useMediaQuery } from "@app/hooks/use-media-query"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import Backdrop from "./backdrop"
import { Button } from "./button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./dialog"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "./drawer"

export function ResponsiveDialog({
    isOpen,
    setIsOpen,
    title,
    trigger,
    triggerClasses,
    component,
    hideTitle,
    hideDescription,
    backdrop,
    triggerVariant,
    triggerSize,
    dialogFit,
    dialogClasses,
    footer,
    description,
}) {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button
                        size={triggerSize}
                        variant={triggerVariant ? triggerVariant : "ghost"}
                        className={triggerClasses ? `${triggerClasses}` : ""}
                    >
                        {trigger}
                    </Button>
                </DialogTrigger>
                <DialogContent
                    onOpenAutoFocus={(event) => {
                        event.preventDefault()
                    }}
                    className={`${
                        dialogFit
                            ? "max-w-fit"
                            : "flex max-w-screen-lg flex-col overflow-hidden"
                    } ${dialogClasses}`}
                >
                    <DialogHeader
                        className={backdrop && `min-h-0 overflow-hidden`}
                    >
                        {backdrop && <Backdrop backdrop={backdrop} />}
                        {hideTitle && (
                            <VisuallyHidden.Root>
                                <DialogTitle>{title}</DialogTitle>
                            </VisuallyHidden.Root>
                        )}
                        {!hideTitle && <DialogTitle>{title}</DialogTitle>}
                        {hideDescription && (
                            <VisuallyHidden.Root>
                                <DialogDescription>{`${title} Information`}</DialogDescription>
                            </VisuallyHidden.Root>
                        )}
                        {!hideDescription && (
                            <DialogDescription>{description}</DialogDescription>
                        )}
                    </DialogHeader>
                    {component}
                    <DialogFooter>{footer}</DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }
    if (!isDesktop) {
        return (
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerTrigger asChild>
                    <Button
                        size={triggerSize}
                        variant={triggerVariant ? triggerVariant : "ghost"}
                        className={triggerClasses}
                    >
                        {trigger}
                    </Button>
                </DrawerTrigger>
                <DrawerContent
                    className={`fixed bottom-0 h-[100svh] max-h-[100svh]`}
                >
                    <DrawerHeader className="text-left">
                        {backdrop && (
                            <Backdrop backdrop={backdrop} mobile={true} />
                        )}

                        {hideTitle && (
                            <VisuallyHidden.Root>
                                <DrawerTitle>{title}</DrawerTitle>
                            </VisuallyHidden.Root>
                        )}
                        {!hideTitle && <DrawerTitle>{title}</DrawerTitle>}
                        {hideDescription && (
                            <VisuallyHidden.Root>
                                <DrawerDescription>{`${title} Information`}</DrawerDescription>
                            </VisuallyHidden.Root>
                        )}
                        {!hideDescription && (
                            <DrawerDescription>{`${title} Information`}</DrawerDescription>
                        )}
                    </DrawerHeader>
                    {component}
                    <DrawerFooter className="bottom-0 pt-2">
                        {footer}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
    }
}
