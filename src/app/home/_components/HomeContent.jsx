"use client"

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@components/ui/alert-dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@components/ui/form"
import { PRISMA_UPDATE_DISPLAY_NAME } from "@api/prismaFuncs"
import { SORTED_BOARDS } from "@lib/const"
import { useEffect, useState } from "react"
import BoardCard from "./BoardCard"
import EmptyBoardsDisplay from "./EmptyBoardDisplay"
import HomeBoardsBar from "./HomeBoardsBar"
import UserBoardsContainer from "./UserBoardsContainer"

import { Button } from "@app/components/ui/button"
import { Input } from "@app/components/ui/input"
import { AppDataContext } from "@components/_providers/appDataProvider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    displayName: z.string().min(4, { message: "Minimum 4 characters" }),
})

export default function HomeContent({ appData }) {
    const { user, newUser } = appData

    const [newUserDialogOpen, setNewUserDialogOpen] = useState(false)
    const userBoards = user.boards

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            displayName: "",
        },
    })

    useEffect(() => {
        if (newUser || user.name == "null") {
            setNewUserDialogOpen(true)
        }
    }, [newUser, user.name])

    async function onSubmit(values) {
        await PRISMA_UPDATE_DISPLAY_NAME(user, values.displayName)
        setNewUserDialogOpen(false)
    }

    return (
        <AppDataContext.Provider value={{ appData }}>
            <section
                className={`no-scrollbar col-start-2 col-end-5 flex h-full flex-1 flex-col overflow-x-visible overflow-y-scroll`}
            >
                <HomeBoardsBar appData={appData} />
                <UserBoardsContainer>
                    {userBoards.length === 0 && <EmptyBoardsDisplay />}
                    {userBoards.length > 0 &&
                        SORTED_BOARDS(userBoards).map((board, index) => {
                            return (
                                <BoardCard
                                    board={board}
                                    key={index}
                                    index={index}
                                    appData={appData}
                                />
                            )
                        })}
                </UserBoardsContainer>
                {(newUser || user.name == "null") && (
                    <AlertDialog
                        open={newUserDialogOpen}
                        onOpenChange={setNewUserDialogOpen}
                    >
                        <Form {...form}>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Welcome to tiertogether!
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Get started by updating your display
                                        name.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="flex flex-col gap-4"
                                >
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
                                                    <Input
                                                        placeholder={
                                                            user.name ==
                                                                "null" ||
                                                            user.name ==
                                                                "null null"
                                                                ? "Please enter a Display Name"
                                                                : user.name
                                                        }
                                                        type="text"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <p className={`text-sm text-zinc-400`}>
                                        By default, we use the name associated
                                        with the account you logged in with, but
                                        not everyone wants to show their real
                                        name.
                                    </p>
                                    <p className={`text-sm text-zinc-400`}>
                                        You can change your display name anytime
                                        by selecting your profile.
                                    </p>

                                    <AlertDialogFooter className={`mt-4`}>
                                        <AlertDialogCancel
                                            size="sm"
                                            onClick={() =>
                                                setNewUserDialogOpen(false)
                                            }
                                            variant="outline"
                                            disabled={
                                                user.name == "null" ||
                                                user.name == "null null"
                                            }
                                            className={`border border-transparent`}
                                        >
                                            Nah, I&apos;m good
                                        </AlertDialogCancel>
                                        <Button type="submit" className={`h-8`}>
                                            {form.formState.isSubmitting &&
                                                "Updating..."}
                                            {!form.formState.isSubmitting &&
                                                "Update Display Name"}
                                        </Button>
                                    </AlertDialogFooter>
                                </form>
                            </AlertDialogContent>
                        </Form>
                    </AlertDialog>
                )}
            </section>
        </AppDataContext.Provider>
    )
}
