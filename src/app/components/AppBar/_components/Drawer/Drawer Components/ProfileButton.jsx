"use client"
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
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@components/ui/drawer"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@components/ui/form"

import { useMediaQuery } from "@app/hooks/use-media-query"
import { Button } from "@components/ui/button"
import {
    ChevronsUpDown,
    LogOut,
    Settings,
    UserCog,
    UserPen,
} from "lucide-react"
import { SignOutButton, UserButton, UserProfile } from "@clerk/nextjs"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@components/ui/input"
import { PRISMA_UPDATE_DISPLAY_NAME } from "@api/prismaFuncs"
import { toast } from "sonner"

const formSchema = z.object({
    displayName: z.string().min(4, { message: "Minimum 4 characters" }),
})

export default function ProfileButton({ user }) {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className={`justify-between`}>
                            <div className={`flex items-center gap-4`}>
                                <UserButton />
                                {user.name}
                            </div>
                            <ChevronsUpDown className={`h-4 w-4`} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
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
                <DialogContent
                    className={`xs:rounded-xl max-w-fit gap-0 overflow-y-scroll rounded-xl p-0 sm:rounded-xl md:overflow-clip md:rounded-xl`}
                >
                    <DialogHeader className={`h-0 min-h-0 p-0`}>
                        <VisuallyHidden.Root>
                            <DialogTitle>Edit Profile</DialogTitle>
                            <DialogDescription>Edit Profile</DialogDescription>
                        </VisuallyHidden.Root>
                    </DialogHeader>
                    {/* <Profile appData={appData} /> */}
                </DialogContent>
            </Dialog>
        )
    }

    if (!isDesktop) {
        return (
            <Drawer>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`justify-between`}
                        >
                            <div className={`flex items-center gap-4`}>
                                <UserButton />
                                {user.name}
                            </div>
                            <ChevronsUpDown className={`h-4 w-4`} />
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
                <DrawerContent className={`max-h-[100svh] overflow-clip`}>
                    <DrawerHeader className={`h-0 min-h-0 p-0`}>
                        <VisuallyHidden.Root>
                            <DialogTitle>Edit Profile</DialogTitle>
                            <DialogDescription>Edit Profile</DialogDescription>
                        </VisuallyHidden.Root>
                    </DrawerHeader>
                    {/* <Profile appData={appData} /> */}
                </DrawerContent>
            </Drawer>
        )
    }
}

function Profile({ appData }) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        values: {
            displayName: appData?.user.name,
        },
    })

    async function onSubmit(values) {
        await PRISMA_UPDATE_DISPLAY_NAME(appData?.user, values.displayName)
        toast("Display Name Updated")
    }

    return (
        <UserProfile
            routing="hash"
            appearance={{
                elements: {
                    cardBox:
                        "max-w-[100vw] max-h-[95svh] overflow-clip shadow-none",
                    scrollBox: "overflow-y-scroll flex-1",
                    navbarMobileMenuRow: "bg-none",
                },
            }}
        >
            <UserProfile.Page
                label="Display Name"
                url="custom"
                labelIcon={<UserPen className={`h-4 w-4`} />}
            >
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="displayName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Display Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className={`h-8`}>
                            {form.formState.isSubmitting && "Updating..."}
                            {!form.formState.isSubmitting &&
                                "Update Display Name"}
                        </Button>
                    </form>
                </Form>
            </UserProfile.Page>
        </UserProfile>
    )
}
