import Poster from "@components/ui/Poster"
import { Button } from "@components/ui/button"
import { ResponsiveDialog } from "@components/ui/ResponsiveDialog"
import { Check, Plus } from "lucide-react"
import { PRISMA_ADD_ITEM } from "@api/prismaFuncs"
import { itemType } from "@lib/const"
import { useContext } from "react"
import { AppDataContext } from "@app/components/_providers/appDataProvider"
import { useState } from "react"
import { toast } from "sonner"
import InfoDialogContent from "../Dialogs/InfoDialogContent"
import { useMediaQuery } from "@app/hooks/use-media-query"
import { useGetDetailsQuery } from "@app/hooks/use-get-fetch-query"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@app/components/ui/tooltip"

export default function InfoCard({ item }) {
    const { appData } = useContext(AppDataContext)
    const { board } = appData
    const name = item?.name ? item.name : item.title

    const details = useGetDetailsQuery(item.id, appData.board.type)

    const isDesktop = useMediaQuery("(min-width: 768px)")
    const [alreadyIncluded, setAlreadyIncluded] = useState(
        board.items.some((boardItem) => boardItem.id === item.id),
    )
    async function handleAdd() {
        if (alreadyIncluded) return

        let content = `${name} added to ${board.boardName}`

        let runFinally = true
        await PRISMA_ADD_ITEM(
            board,
            {
                id: item.id,
                backdrop_path: item.backdrop_path,
                type: itemType(board, queryType),
            },
            content,
            "itemAdded",
        )
            .catch((err) => {
                if (err) runFinally = false
                console.error(err)
            })
            .finally(() => {
                if (!runFinally) return
                setAlreadyIncluded(true)

                toast(content, {
                    action: {
                        label: "Close",
                        onClick: () => null,
                    },
                })
            })
    }

    return (
        <ResponsiveDialog
            trigger={
                <TooltipProvider delayDuration={100}>
                    <Tooltip>
                        <TooltipTrigger>
                            <Poster
                                className={`row-start-1 row-end-3 h-28 w-auto justify-self-center shadow-lg transition-all md:hover:scale-105 md:hover:shadow-purple-200/50`}
                                itemId={item.id}
                                boardType={board.type}
                                height={256}
                                width={170}
                            />
                        </TooltipTrigger>
                        <TooltipContent>
                            {item.name ? item.name : item.title}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            }
            triggerSize={"sm"}
            triggerClasses={`p-0 h-auto w-auto`}
            triggerIsAsChild={false}
            component={<InfoDialogContent item={item} search={true} />}
            dialogClasses={`md:max-w-screen-sm`}
            footer={
                <Button
                    variant="outline"
                    className={`col-start-1 mx-auto flex flex-row items-center transition-colors md:col-end-4 ${
                        !alreadyIncluded
                            ? ""
                            : "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                    } `}
                    onClick={handleAdd}
                >
                    {!alreadyIncluded ? (
                        <Plus className={`mr-2`} />
                    ) : (
                        <Check className={`mr-2`} />
                    )}
                    <p>
                        {!alreadyIncluded
                            ? "Add this Item to the Board"
                            : "Item is already on the Board"}
                    </p>
                </Button>
            }
            title={item.name}
            backdrop={item.backdrop_path}
            hideDescription={true}
            hideTitle={true}
        />
    )
}
