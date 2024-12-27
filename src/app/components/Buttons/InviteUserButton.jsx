"use client"

import {
    Check,
    ClipboardCopy,
    MailPlus,
    Plus,
    Send,
    Share2,
} from "lucide-react"
import { Button } from "../ui/button"
import INVITE_USER from "@lib/invite"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@components/ui/alert-dialog"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs"

import { Input } from "@components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState, useRef, useContext } from "react"
import { PRISMA_CREATE_LINK_INVITATION } from "@api/prismaFuncs"

import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import QRCode from "react-qr-code"

const formSchema = z.object({
    emailAddress: z.string().email({
        message: "Invalid email address",
    }),
})

export default function InviteUserButton({ boardId, boardName, size }) {
    const [invitedEmail, setInvitedEmail] = useState([])
    const [copied, setCopied] = useState(false)

    const ref = useRef()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emailAddress: "",
        },
    })

    async function createInviteLink() {
        const invitation = await PRISMA_CREATE_LINK_INVITATION(boardId)
        const inviteLink = `tiertogether.com/link/${invitation.id}`

        return inviteLink
    }

    const { data, isLoading, isError, error, isSuccess } = useQuery({
        queryKey: ["inviteLink"],
        queryFn: createInviteLink,
        staleTime: 60 * 1000,
        refetchOnMount: true,
    })

    async function onSubmit(values) {
        form.resetField("emailAddress")
        let response = await INVITE_USER(values.emailAddress, boardId)

        setInvitedEmail((prev) => {
            let obj = { address: values.emailAddress, response: response }
            return [obj, ...prev]
        })
    }

    const handleOpenChange = () => {
        setInvitedEmail([])
        form.reset()
    }

    const handleCopyToClipboard = () => {
        toast("Copied to clipboard")
        updateCopyIcon()
        navigator.clipboard.writeText(ref.current.innerText)
    }

    function updateCopyIcon() {
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 3000)
    }

    const handleShare = async () => {
        navigator.share({
            url: ref.current.innerText,
            title: "tiertogether Invite",
            text: `You\'ve been invited to ${boardName}!`,
        })
    }

    return (
        <AlertDialog onOpenChange={handleOpenChange}>
            <AlertDialogTrigger asChild>
                <Button
                    size="sm"
                    variant="outline"
                    className={`border-emerald-500 text-emerald-600 hover:border-emerald-600 hover:bg-emerald-600/30 dark:border-emerald-500 dark:text-emerald-50 dark:hover:border-emerald-600 dark:hover:bg-emerald-600/30`}
                >
                    <Send className={`${size !== "icon" && "mr-2"} h-4 w-4`} />
                    {size !== "icon" && "Invite User"}
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader className={`text-left`}>
                    <AlertDialogTitle>
                        {`Invite someone to ${boardName ? boardName : "tiertogether"}?`}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Send this link to someone you know or share the QR code
                        to invite them to join this board.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className={`my-4 flex flex-col items-center gap-8`}>
                    <div className={`flex w-full flex-col gap-2`}>
                        <p
                            className={`text-sm text-zinc-800 dark:text-zinc-400`}
                        >
                            Select to copy link or use the share button
                        </p>
                        <div
                            id="linkBox"
                            className={`flex items-center justify-between gap-2`}
                        >
                            <Button
                                variant="outline"
                                className={`flex h-8 flex-1 items-center justify-between`}
                                onClick={handleCopyToClipboard}
                            >
                                <div
                                    className={`text-sm text-zinc-900 dark:text-zinc-200`}
                                >
                                    {isLoading && "Creating Invite Link..."}
                                    {isError && `Link Error: ${error}`}
                                    {isSuccess && <p ref={ref}>{data}</p>}
                                </div>
                                {copied && (
                                    <Check
                                        className={`h-4 w-4 text-purple-800 dark:text-purple-300`}
                                    />
                                )}
                                {!copied && (
                                    <ClipboardCopy
                                        className={`h-4 w-4 text-purple-800 dark:text-purple-300`}
                                    />
                                )}
                            </Button>
                            <Button
                                variant="outline"
                                className={`h-10 w-10 p-0 text-purple-800 dark:text-purple-300`}
                                onClick={handleShare}
                            >
                                <Share2 className={`h-4 w-4`} />
                            </Button>
                        </div>
                    </div>
                    <div className={`h-auto w-48 bg-white p-2`}>
                        <QRCode
                            style={{
                                height: "auto",
                                maxWidth: "100%",
                                width: "100%",
                            }}
                            value={data}
                        />
                    </div>
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel className={`h-8`}>
                        Cancel
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
