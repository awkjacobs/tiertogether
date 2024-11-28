import { useState } from "react"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { useMediaQuery } from "@/app/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { LogOut, Settings, UserCog } from "lucide-react"
import { SignOutButton } from "@clerk/nextjs"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { PRISMA_UPDATE_DISPLAY_NAME } from "@prismaFuncs/prismaFuncs"
import { toast } from "sonner"

const formSchema = z.object({
    displayName: z.string().min(4, { message: "Minimum 4 characters" }),
})

export default function ProfileButton({ appData }) {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const [isOpen, setIsOpen] = useState()

    const form = useForm({
        resolver: zodResolver(formSchema),
        values: {
            displayName: appData.user.name,
        },
    })

    async function onSubmit(values) {
        await PRISMA_UPDATE_DISPLAY_NAME(appData.user, values.displayName)
        toast("Display Name Updated")
    }

    if (isDesktop) {
        return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                            {appData.user.name}
                            <Settings className={`ml-4`} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DialogTrigger asChild>
                            <DropdownMenuItem className={`cursor-pointer`}>
                                <UserCog
                                    size={16}
                                    color="#ffffff"
                                    className={`mr-4`}
                                />
                                Profile
                            </DropdownMenuItem>
                        </DialogTrigger>
                        <SignOutButton redirectUrl={`/`}>
                            <DropdownMenuItem className={`cursor-pointer`}>
                                <LogOut
                                    size={16}
                                    color="#ffffff"
                                    className={`mr-4`}
                                />
                                Logout
                            </DropdownMenuItem>
                        </SignOutButton>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Form {...form}>
                    <DialogContent className="max-w-screen-md">
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-4"
                        >
                            <DialogHeader>
                                <DialogTitle>Edit Profile</DialogTitle>
                                <VisuallyHidden.Root>
                                    <DialogDescription>
                                        Edit Profile
                                    </DialogDescription>
                                </VisuallyHidden.Root>
                            </DialogHeader>
                            <FormField
                                control={form.control}
                                name="displayName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel
                                            className={`text-purple-800 dark:text-purple-400`}
                                        >
                                            Display Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <Button type="submit" className={`h-8`}>
                                    {form.formState.isSubmitting &&
                                        "Updating..."}
                                    {!form.formState.isSubmitting &&
                                        "Update Display Name"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Form>
            </Dialog>
        )
    }

    if (!isDesktop) {
        return (
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`h-10 self-start text-purple-200`}
                        >
                            {appData.user.name}
                            <Settings className={`ml-4`} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DialogTrigger asChild>
                            <DropdownMenuItem>
                                <UserCog
                                    size={16}
                                    color="#ffffff"
                                    className={`mr-4`}
                                />
                                Profile
                            </DropdownMenuItem>
                        </DialogTrigger>

                        <SignOutButton redirectUrl={`/`}>
                            <DropdownMenuItem className={`cursor-pointer`}>
                                <LogOut
                                    size={16}
                                    color="#ffffff"
                                    className={`mr-4`}
                                />
                                Logout
                            </DropdownMenuItem>
                        </SignOutButton>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Form {...form}>
                    <DrawerContent className={`h-[90svh]`}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex h-full flex-col gap-4"
                        >
                            <DrawerHeader className="text-left">
                                <DrawerTitle>Edit Profile</DrawerTitle>
                                <VisuallyHidden.Root>
                                    <DrawerDescription>
                                        Edit Profile
                                    </DrawerDescription>
                                </VisuallyHidden.Root>
                            </DrawerHeader>
                            <div className={`mx-4 flex-1`}>
                                <FormField
                                    control={form.control}
                                    name="displayName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                className={`text-purple-800 dark:text-purple-400`}
                                            >
                                                Display Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <DrawerFooter>
                                <Button type="submit" className={`h-8`}>
                                    {form.formState.isSubmitting &&
                                        "Updating..."}
                                    {!form.formState.isSubmitting &&
                                        "Update Display Name"}
                                </Button>
                            </DrawerFooter>
                        </form>
                    </DrawerContent>
                </Form>
            </Drawer>
        )
    }
}
