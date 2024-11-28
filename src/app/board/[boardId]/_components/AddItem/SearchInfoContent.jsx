import DescriptionContainer from "../../../../components/Dialogs/Dialog Modules/Dialog Components/DescriptionContainer"
import Poster from "../../../../components/ui/Poster"
import { useMediaQuery } from "@/app/hooks/use-media-query"
import DescriptionDetails from "../../../../components/Dialogs/Dialog Modules/Dialog Components/DescriptionDetails"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { SearchLogo } from "./SearchLogo"
import Logo from "../../../../components/Dialogs/Dialog Modules/Dialog Components/Logo"

export default function SearchInfoContent({ item, type, queryType }) {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <div
                className={`relative z-10 grid grid-cols-[auto_1fr] grid-rows-[auto_auto_1fr] gap-x-12 gap-y-8 p-6 pb-0`}
            >
                <Poster
                    className={`row-start-1 row-end-3 h-40 w-auto justify-self-center shadow-lg md:h-64 md:w-auto`}
                    itemId={item.id}
                    boardType={type}
                    height={256}
                    width={170}
                />
                <div className={`md:h-44`}>
                    <SearchLogo
                        itemId={item.id}
                        title={item.title ? item.title : item.name}
                        type={type}
                    />
                </div>
                <DescriptionContainer item={item} type={type} />
                <div
                    className={`flex flex-col gap-4 md:col-start-1 md:col-end-3`}
                >
                    <DescriptionDetails
                        itemId={item.id}
                        type={type}
                        queryType={queryType}
                    />

                    <ScrollArea className={`max-h-64 p-1 pr-4 leading-7`}>
                        {item.overview}
                    </ScrollArea>
                </div>
            </div>
        )
    }
    if (!isDesktop) {
        return (
            <div
                className={`relative z-10 grid h-full flex-1 grid-cols-[auto] grid-rows-[9rem,auto,1fr] gap-4 px-6 py-0`}
            >
                <div className={`flex h-28 flex-row gap-4`}>
                    <Poster
                        className={`justify-self-left row-start-1 row-end-3 h-28 w-auto shadow-lg`}
                        itemId={item.id}
                        boardType={type}
                        height={112}
                        width={75}
                    />
                    <Logo
                        itemId={item.id}
                        title={item.title ? item.title : item.name}
                        type={type}
                    />
                </div>
                {/* title={item.title ? item.title : item.name} */}
                <DescriptionContainer item={item} type={type} />
                <div className={`flex flex-col gap-4 overflow-y-scroll`}>
                    <DescriptionDetails
                        itemId={item.id}
                        type={type}
                        queryType={queryType}
                    />

                    <div
                        className={`overflow-y-scroll p-1 pb-0 pr-4 text-sm leading-7`}
                    >
                        {item.overview}
                    </div>
                </div>
            </div>
        )
    }
}
