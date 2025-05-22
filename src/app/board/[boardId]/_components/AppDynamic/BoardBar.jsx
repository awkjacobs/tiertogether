import BoardTypeIcon from "@app/components/Utility/BoardTypeIcons"
import { useGetServerAverages } from "@app/hooks/use-get-serverAverage"
import EditBoardButton from "@components/Buttons/EditBoardButton"
import { Button } from "@components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select"
import { Separator } from "@components/ui/separator"
import { ZoomIn, ZoomOut } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useQueryState } from "nuqs"
import { useContext } from "react"
import { AppDataContext } from "../../../../components/_providers/appDataProvider"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@components/ui/tooltip"
import { useSetAtom } from "jotai"
import { queueIsOpenAtom } from "@app/atoms"

export default function BoardBar({ setUserEntries }) {
    const { appData } = useContext(AppDataContext)
    const serverRanks = useGetServerAverages(appData.board.id)
    const isOwner = appData.user.id === appData.board.owner.id
    const setQueueIsOpen = useSetAtom(queueIsOpenAtom)

    const [cardSize, setCardSize] = useQueryState("cardSize", {
        defaultValue: "1",
    })

    const searchParams = useSearchParams()
    const currentCardSize = searchParams.get("cardSize")

    const handleZoomIn = () => {
        switch (currentCardSize) {
            case "2":
                setCardSize("3")
                break
            default:
                setCardSize("2")
                break
        }
    }
    const handleZoomOut = () => {
        switch (currentCardSize) {
            case "2":
                setCardSize("1")
                break
            case "3":
                setCardSize("2")
                break
            default:
                break
        }
    }

    const handleValueChange = (value) => {
        setQueueIsOpen(value === appData.user.id)
        setUserEntries(value)
    }
    return (
        <div
            className={`my-2 grid w-full grid-cols-[1fr,auto] grid-rows-[auto,auto] items-center gap-2 md:grid-cols-[1fr,auto,auto] md:grid-rows-[auto]`}
        >
            <div
                className={`col-start-1 row-start-1 flex flex-1 flex-row items-center gap-2 md:gap-4`}
            >
                <BoardTypeIcon
                    type={appData.board.type}
                    className={`text-purple-700 dark:text-purple-200`}
                />
                <h1
                    className={`text-base font-bold text-purple-700 md:text-2xl dark:text-purple-200`}
                >
                    {appData.board.boardName}
                </h1>
            </div>
            <div
                className={`col-start-1 col-end-3 row-start-2 flex w-full flex-row items-center gap-2 md:col-start-2 md:col-end-3 md:row-start-1`}
            >
                <TooltipProvider>
                    <div
                        className={`flex flex-row divide-x divide-zinc-300 rounded-md border border-zinc-300 dark:divide-zinc-800 dark:border-zinc-800`}
                    >
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className={`h-8 w-8 rounded-e-none px-2 md:h-10 md:w-10`}
                                    onClick={handleZoomIn}
                                    disabled={currentCardSize === "3"}
                                >
                                    <ZoomIn className={`h-4 w-4`} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Increase Card Size</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className={`h-8 w-8 rounded-s-none px-2 md:h-10 md:w-10`}
                                    onClick={handleZoomOut}
                                    disabled={
                                        currentCardSize === "1" ||
                                        currentCardSize === null
                                    }
                                >
                                    <ZoomOut className={`h-4 w-4`} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Decrease Card Size</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </TooltipProvider>
                <Select
                    defaultValue={appData.user.id}
                    onValueChange={handleValueChange}
                    disabled={!serverRanks.data}
                >
                    <SelectTrigger className="h-8 flex-1 md:h-10 md:w-52">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="overall">Overall Ranks</SelectItem>
                        <SelectItem value={appData.user.id}>
                            My Ranks
                        </SelectItem>
                        <Separator />
                        {appData.board.users
                            .filter((user) => user.id !== appData.user.id)
                            .map((user) => (
                                <SelectItem key={user.id} value={user.id}>
                                    {user.name}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>

            <EditBoardButton
                triggerClasses={`cursor-pointer row-start-1 col-start-2 md:col-start-3`}
                appData={appData}
                board={appData.board}
                isOwner={isOwner}
            />
        </div>
    )
}
