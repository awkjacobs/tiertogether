import { useGetDetailsQuery } from "@app/hooks/use-get-fetch-query"
import { useMediaQuery } from "@app/hooks/use-media-query"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs"
import Poster from "@components/ui/Poster"
import Logo from "../ItemDetails/Logo"
import RankingsContainer from "../Rankings/RankingsContainer"
import { useContext } from "react"
import ItemDetails from "../ItemDetails/ItemDetails"
import { AppDataContext } from "@app/components/_providers/appDataProvider"
import { Item } from "@radix-ui/react-toggle-group"

export default function InfoDialogContent({ item, ignoreRankings = false }) {
    const { appData } = useContext(AppDataContext)
    const { board } = appData
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const details = useGetDetailsQuery(item.id, board.type)
    const name = details.data.name ? details.data.name : details.data.title

    if (isDesktop) {
        return (
            <div className="grid grid-cols-[auto_1fr] gap-4">
                <div
                    className={`relative z-10 grid grid-cols-[auto_1fr] grid-rows-[auto_auto_1fr] gap-x-12 gap-y-8 p-6 pb-0`}
                >
                    <Poster
                        className={`row-start-1 row-end-3 h-64 w-auto justify-self-center shadow-lg`}
                        itemId={item.id}
                        boardType={board.type}
                        height={256}
                        width={170}
                    />
                    <div
                        className={`flex items-center md:col-start-2 md:col-end-3 md:h-44`}
                    >
                        <Logo itemId={item.id} title={name} type={board.type} />
                    </div>
                    <ItemDetails item={item} />
                </div>
                {!ignoreRankings && <RankingsContainer item={item} />}
            </div>
        )
    }
    if (!isDesktop) {
        return (
            <div
                className={`relative z-10 grid h-full grid-rows-[auto,auto,1fr] gap-4 overflow-y-hidden px-6 py-0`}
            >
                <div className={`flex h-28 flex-row items-center gap-4`}>
                    <Poster
                        className={`justify-self-left row-start-1 row-end-3 h-28 w-auto shadow-lg`}
                        itemId={item.id}
                        boardType={board.type}
                        height={112}
                        width={75}
                    />
                    <Logo
                        itemId={item.id}
                        title={details.data.title}
                        type={board.type}
                    />
                </div>
                {!ignoreRankings && (
                    <Tabs
                        defaultValue="info"
                        className={`row-span-2 row-start-2 row-end-4 grid h-full grid-rows-subgrid gap-4`}
                    >
                        <TabsList
                            className={`row-start-1 row-end-2 w-full bg-zinc-200 dark:bg-zinc-900`}
                        >
                            <TabsTrigger
                                value="info"
                                className={`w-full rounded data-[state=active]:bg-purple-600 data-[state=active]:text-purple-100 dark:data-[state=active]:bg-purple-800`}
                            >
                                Info
                            </TabsTrigger>
                            <TabsTrigger
                                value="ranks"
                                className={`w-full rounded data-[state=active]:bg-purple-600 data-[state=active]:text-purple-100 dark:data-[state=active]:bg-purple-800`}
                            >
                                Rankings
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value="info"
                            className={`row-start-2 row-end-3 overflow-y-scroll`}
                        >
                            <ItemDetails item={item} />
                        </TabsContent>
                        <TabsContent
                            value="ranks"
                            className={`row-start-2 row-end-3 overflow-hidden`}
                        >
                            <RankingsContainer item={item} />
                        </TabsContent>
                    </Tabs>
                )}
                {ignoreRankings && <ItemDetails item={item} />}
            </div>
        )
    }
}
