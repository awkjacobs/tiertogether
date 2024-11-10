import { useMediaQuery } from "@/app/hooks/use-media-query"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import Poster from "../../ui/Poster"
import DescriptionContainer from "./Dialog Components/DescriptionContainer"
import Logo from "./Dialog Components/Logo"
import RankingsContainer from "./Dialog Components/RankingsContainer"
import { userRanksArray } from "./Dialog Functions/userRanksArray"
import DescriptionDetails from "./Dialog Components/DescriptionDetails"
import { ScrollArea } from "../../ui/scroll-area"
import { useQuery } from "@tanstack/react-query"

export default function InfoDialogContent({ item, appData }) {
    const { users, serverRanks, board } = appData
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const itemInfo = useQuery({
        queryKey: ["details", item.id],
        queryFn: () => TMDB_GET_DETAILS(item.id, board.type),
    })
    const name = itemInfo.data.name ? itemInfo.data.name : itemInfo.data.title

    const [ranks, setRanks] = useState({
        averageRank: "",
        userRanks: [{ name: "", rank: "" }],
    })

    function findServerRank() {
        if (!item) return
        const average = serverRanks

        const serverRankings = average.allItems

        let serverRank = serverRankings.find(
            (rank) => rank.id === item.id,
        )?.averageRank
        return serverRank
    }

    useEffect(() => {
        if (!item) return

        userRank(item)
    }, [item])

    function userRank(item) {
        let serverRank = findServerRank()

        let ranksArray = userRanksArray(item, users, board.id)

        setRanks({
            averageRank: serverRank,
            userRanks: ranksArray,
        })
    }

    if (isDesktop) {
        return (
            <div
                className={`relative z-10 grid grid-cols-[auto_1fr_1fr] grid-rows-[auto_auto_1fr] gap-x-12 gap-y-8 p-6 pb-0`}
            >
                <Poster
                    className={`row-start-1 row-end-3 h-40 w-auto justify-self-center shadow-lg md:h-64 md:w-auto`}
                    source={itemInfo.data.poster_path}
                    height={256}
                    width={170}
                />
                <div
                    className={`flex items-center md:col-start-2 md:col-end-4 md:h-44`}
                >
                    <Logo itemId={item.id} title={name} type={board.type} />
                </div>
                <RankingsContainer ranks={ranks} appData={appData} />
                <DescriptionContainer item={item} type={board.type} />
                <div
                    className={`flex flex-col gap-4 md:col-start-1 md:col-end-3`}
                >
                    <DescriptionDetails
                        itemId={item.id}
                        type={appData.board.type}
                    />

                    <ScrollArea className={`max-h-64 p-1 pr-4 leading-7`}>
                        {itemInfo.data.overview}
                    </ScrollArea>
                </div>
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
                        source={itemInfo.data.poster_path}
                        height={320}
                        width={224.4}
                    />
                    <Logo
                        itemId={item.id}
                        title={itemInfo.title}
                        type={appData.board.type}
                    />
                </div>
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
                        <div className={`flex flex-col gap-4`}>
                            <DescriptionContainer item={item} />
                            <DescriptionDetails
                                itemId={item.id}
                                type={appData.board.type}
                            />

                            <div className={`text-sm leading-7`}>
                                {itemInfo.data.overview}
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent
                        value="ranks"
                        className={`row-start-2 row-end-3 overflow-hidden`}
                    >
                        <RankingsContainer ranks={ranks} appData={appData} />
                    </TabsContent>
                </Tabs>
            </div>
        )
    }
}
