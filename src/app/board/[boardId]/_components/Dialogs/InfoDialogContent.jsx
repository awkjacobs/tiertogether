import { useMediaQuery } from "@app/hooks/use-media-query"
import Poster from "../Cards/Card Components/Poster"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs"
import ItemDetails from "../ItemDetails/ItemDetails"
import Logo from "../ItemDetails/Logo"
import RankingsContainer from "../Rankings/RankingsContainer"
import { useContext } from "react"
import { ItemDataContext } from "@app/components/_providers/itemDataProvider"

export default function InfoDialogContent({ item }) {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const { itemId, itemType, details } = useContext(ItemDataContext)
    const name = details.data?.name ? details.data?.name : details.data?.title

    if (isDesktop) {
        return (
            <div className="relative grid grid-cols-[auto_1fr_auto] grid-rows-[auto_auto_1fr] gap-8 overflow-clip">
                <Poster
                    className={`row-start-1 row-end-3 max-h-64 w-max justify-self-center object-contain shadow-lg`}
                    itemId={`${itemId}-${itemType}`}
                    height={256}
                    width={170}
                />
                <div
                    className={`flex items-center md:col-start-2 md:col-end-3 md:h-44`}
                >
                    <Logo itemId={itemId} title={name} itemType={itemType} />
                </div>
                <ItemDetails item={item} />
                {item?.rank && <RankingsContainer item={item} />}
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
                        itemId={itemId}
                        itemType={itemType}
                        height={112}
                        width={75}
                    />
                    <Logo itemId={itemId} title={name} type={itemType} />
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
                            disabled={!item?.rank}
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
                    {item?.rank && (
                        <TabsContent
                            value="ranks"
                            className={`row-start-2 row-end-3 overflow-hidden`}
                        >
                            <RankingsContainer item={item} />
                        </TabsContent>
                    )}
                </Tabs>
            </div>
        )
    }
}
