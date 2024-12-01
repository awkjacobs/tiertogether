import EditBoardButton from "@/components/Buttons/EditBoardButton"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useContext } from "react"
import RankingsToggle from "./RankingsToggle"
import { AppDataContext } from "../../../../components/_providers/appDataProvider"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function BoardBar({
    showServerRanks,
    setShowServerRanks,
    queueIsOpen,
    setQueueIsOpen,
    setUserEntries,
}) {
    const { appData } = useContext(AppDataContext)
    const isOwner = appData.user.id === appData.board.owner.id

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentCardSize = searchParams.get("cardSize")
    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams],
    )

    const handleZoomIn = () => {
        switch (currentCardSize) {
            case "2":
                router.push(pathname + "?" + createQueryString("cardSize", "3"))
                break
            default:
                router.push(pathname + "?" + createQueryString("cardSize", "2"))
                break
        }
    }
    const handleZoomOut = () => {
        switch (currentCardSize) {
            case "2":
                router.push(pathname + "?" + createQueryString("cardSize", "1"))
                break
            case "3":
                router.push(pathname + "?" + createQueryString("cardSize", "2"))
                break
            default:
                break
        }
    }

    return (
        <div
            className={`my-2 flex w-full flex-col items-center justify-end md:flex-row`}
        >
            <div className={`flex-1`}>
                <h1
                    className={`flex-1 text-base font-bold text-purple-700 md:text-2xl dark:text-purple-200`}
                >
                    {appData.board.boardName}
                </h1>
            </div>
            <div className={`flex flex-row`}>
                <div className={`flex flex-row px-1 md:px-2`}>
                    <Button
                        variant="outline"
                        className={`h-8 w-8 rounded-e-none px-2 md:h-10 md:w-10`}
                        onClick={handleZoomIn}
                        disabled={currentCardSize === "3"}
                    >
                        <ZoomIn className={`h-4 w-4`} />
                    </Button>
                    <Button
                        variant="outline"
                        className={`h-8 w-8 rounded-s-none px-2 md:h-10 md:w-10`}
                        onClick={handleZoomOut}
                        disabled={
                            currentCardSize === "1" || currentCardSize === null
                        }
                    >
                        <ZoomOut className={`h-4 w-4`} />
                    </Button>
                </div>
                <Select
                    defaultValue={appData.user.id}
                    onValueChange={(value) => setUserEntries(value)}
                >
                    <SelectTrigger className="h-8 w-40 md:h-10 md:w-52">
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

                <EditBoardButton
                    triggerClasses={`ml-1 cursor-pointer`}
                    appData={appData}
                    board={appData.board}
                    isOwner={isOwner}
                />
            </div>
        </div>
    )
}
