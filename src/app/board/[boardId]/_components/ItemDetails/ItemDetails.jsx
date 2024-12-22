import { useGetDetailsQuery } from "@app/hooks/use-get-fetch-query"
import { useMediaQuery } from "@app/hooks/use-media-query"
import { useContext } from "react"
import { AppDataContext } from "@app/components/_providers/appDataProvider"
import ItemBadges from "./ItemBadges"
import CastAndStatus from "./CastAndStatus"
import { ScrollArea } from "@app/components/ui/scroll-area"
import Collection from "./Collection"

export default function ItemDetails({ item }) {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const { appData } = useContext(AppDataContext)
    const { board } = appData

    const details = useGetDetailsQuery(item.id, board.type)

    if (isDesktop)
        return (
            <>
                <ItemBadges item={item} type={board.type} />
                <div
                    className={`flex flex-col gap-4 md:col-start-1 md:col-end-3`}
                >
                    <CastAndStatus itemId={item.id} type={board.type} />

                    <ScrollArea className={`max-h-64 p-1 pr-4 leading-7`}>
                        {details.data.overview}
                    </ScrollArea>
                    {details.data.belongs_to_collection && (
                        <Collection
                            collection={details.data.belongs_to_collection}
                        />
                    )}
                </div>
            </>
        )
    return (
        <div className={`flex flex-col gap-4`}>
            <ItemBadges item={item} type={board.type} />
            <CastAndStatus itemId={item.id} type={board.type} />

            <div className={`text-sm leading-7`}>{details.data.overview}</div>
            {details.data.belongs_to_collection && (
                <Collection collection={details.data.belongs_to_collection} />
            )}
        </div>
    )
}
