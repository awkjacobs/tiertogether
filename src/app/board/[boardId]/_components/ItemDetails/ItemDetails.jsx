import { useMediaQuery } from "@app/hooks/use-media-query"
import ItemBadges from "./ItemBadges"
import DetailsBlock from "./DetailsBlock"
import { ScrollArea } from "@app/components/ui/scroll-area"
import Collection from "./Collection"
import Franchise from "./Franchise"
import { ItemDataContext } from "@app/components/_providers/itemDataProvider"
import { useContext } from "react"

export default function ItemDetails({ item }) {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const { details } = useContext(ItemDataContext)

    if (isDesktop)
        return (
            <>
                <ItemBadges item={item} />
                <ScrollArea
                    className={`max-w-3xl pr-3 md:col-start-1 md:col-end-3`}
                >
                    <div className={`space-y-4`}>
                        <DetailsBlock />

                        {details.data?.overview && (
                            <div>
                                <h4 className={`text-lg font-bold opacity-50`}>
                                    Overview
                                </h4>

                                <p className={`p-1 leading-7`}>
                                    {details.data?.overview}
                                </p>
                            </div>
                        )}
                        {details.data?.storyline && (
                            <div>
                                <h4 className={`text-lg font-bold opacity-50`}>
                                    Storyline
                                </h4>

                                <p className={`p-1 leading-7`}>
                                    {details.data?.storyline}
                                </p>
                            </div>
                        )}
                        {details.data?.summary && (
                            <div>
                                <h4 className={`text-lg font-bold opacity-50`}>
                                    Summary
                                </h4>
                                <p className={`p-1 leading-7`}>
                                    {details.data?.summary}
                                </p>
                            </div>
                        )}

                        {details.data?.belongs_to_collection && (
                            <Collection
                                collection={details.data?.belongs_to_collection}
                            />
                        )}
                        {details.data?.franchises &&
                            details.data?.franchises.map((franchise) => (
                                <Franchise
                                    franchise={franchise}
                                    key={franchise.id}
                                />
                            ))}
                    </div>
                </ScrollArea>
            </>
        )
    if (!isDesktop)
        return (
            <div className={`flex flex-col gap-4`}>
                <ItemBadges item={item} />
                <DetailsBlock />

                {details.data?.overview && (
                    <div>
                        <h4 className={`text-lg font-bold opacity-50`}>
                            Overview
                        </h4>
                        <p className={`text-sm leading-7`}>
                            {details.data?.overview}
                        </p>
                    </div>
                )}
                {details.data?.storyline && (
                    <div>
                        <h4 className={`text-lg font-bold opacity-50`}>
                            Storyline
                        </h4>
                        <p className={`text-sm leading-7`}>
                            {details.data?.storyline}
                        </p>
                    </div>
                )}
                {details.data?.summary && (
                    <div>
                        <h4 className={`text-lg font-bold opacity-50`}>
                            Summary
                        </h4>
                        <p className={`text-sm leading-7`}>
                            {details.data?.summary}
                        </p>
                    </div>
                )}

                {details.data?.belongs_to_collection && (
                    <Collection
                        collection={details.data?.belongs_to_collection}
                    />
                )}
                {details.data?.franchises &&
                    details.data?.franchises.map((franchise) => (
                        <Franchise franchise={franchise} key={franchise.id} />
                    ))}
            </div>
        )
}
