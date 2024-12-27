import { useGetDetailsQuery } from "@app/hooks/use-get-fetch-query"
import { useMediaQuery } from "@app/hooks/use-media-query"
import { useContext } from "react"
import { AppDataContext } from "@app/components/_providers/appDataProvider"
import ItemBadges from "./ItemBadges"
import DetailsBlock from "./DetailsBlock"
import { ScrollArea } from "@app/components/ui/scroll-area"
import Collection from "./Collection"
import Franchise from "./Franchise"

export default function ItemDetails({ item }) {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const details = useGetDetailsQuery(item.id, item.type)

    if (isDesktop)
        return (
            <>
                <ItemBadges item={item} type={item.type} />
                <div
                    className={`flex flex-col gap-4 md:col-start-1 md:col-end-3`}
                >
                    <DetailsBlock itemId={item.id} type={item.type} />

                    <ScrollArea className={`max-h-64 p-1 pr-4 leading-7`}>
                        {details.data.overview
                            ? details.data.overview
                            : details.data.storyline}
                    </ScrollArea>
                    {details.data.belongs_to_collection && (
                        <Collection
                            collection={details.data.belongs_to_collection}
                        />
                    )}
                    {details.data.franchises &&
                        details.data.franchises.map((franchise) => (
                            <Franchise
                                franchise={franchise}
                                key={franchise.id}
                            />
                        ))}
                </div>
            </>
        )
    return (
        <div className={`flex flex-col gap-4`}>
            <ItemBadges item={item} type={item.type} />
            <DetailsBlock itemId={item.id} type={item.type} />

            <div className={`text-sm leading-7`}>{details.data.overview}</div>
            {details.data.belongs_to_collection && (
                <Collection collection={details.data.belongs_to_collection} />
            )}
        </div>
    )
}
