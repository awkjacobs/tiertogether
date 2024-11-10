import BoardTypeToggle from "./Dialog Components/BoardTypeToggle"
import InputWithLabel from "./Dialog Components/InputWithLabel"
import RowOptions from "./Dialog Components/RowOptions"
import BoardUsersArea from "./Dialog Components/BoardUsersArea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMediaQuery } from "@/app/hooks/use-media-query"

export default function NewBoardDialogContent({
    boardName,
    setBoardName,
    setBoardType,
    appData,
    invitedUsers,
    setIvitedUsers,
    rowOptions,
    setRowOptions,
}) {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const boardData = { ownerId: appData.user.id }
    const isOwner = true

    if (isDesktop) {
        return (
            <section
                className={`flex w-full flex-row gap-8 border-b border-zinc-700 p-0 pb-4`}
            >
                <div className={`flex flex-1 flex-col gap-4`}>
                    <InputWithLabel
                        label={"Board Name"}
                        onChange={(e) => setBoardName(e.currentTarget.value)}
                        value={boardName}
                        isOwner={isOwner}
                    />
                    <BoardTypeToggle setBoardType={setBoardType} />

                    <RowOptions
                        rowOptions={rowOptions}
                        setRowOptions={setRowOptions}
                        isDesktop={isDesktop}
                        isOwner={isOwner}
                    />
                </div>
            </section>
        )
    }
    if (!isDesktop) {
        return (
            <section
                className={`grid-cols-auto relative z-10 grid h-full grid-rows-[auto,1fr] gap-4 overflow-y-hidden p-4 pt-0`}
            >
                <Tabs
                    defaultValue="options"
                    className={`row-span-full grid grid-cols-subgrid grid-rows-subgrid overflow-hidden`}
                >
                    <TabsList
                        className={`row-start-1 row-end-2 h-full w-full bg-zinc-200 dark:bg-zinc-900`}
                    >
                        <TabsTrigger
                            value="options"
                            className={`w-full rounded data-[state=active]:bg-purple-600 data-[state=active]:text-purple-100 dark:data-[state=active]:bg-purple-800`}
                        >
                            Board Options
                        </TabsTrigger>
                        <TabsTrigger
                            value="users"
                            className={`w-full rounded data-[state=active]:bg-purple-600 data-[state=active]:text-purple-100 dark:data-[state=active]:bg-purple-800`}
                        >
                            Board Users
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent
                        value="options"
                        className={`row-start-2 row-end-3 grid h-full grid-rows-subgrid overflow-y-scroll data-[state="inactive"]:hidden`}
                    >
                        <div
                            className={`grid grid-rows-[auto,auto,1fr] gap-4 overflow-y-scroll`}
                        >
                            <InputWithLabel
                                label={"Board Name"}
                                onChange={(e) =>
                                    setBoardName(e.currentTarget.value)
                                }
                                value={boardName}
                                isOwner={isOwner}
                                className={"row-start-1"}
                            />
                            <BoardTypeToggle
                                setBoardType={setBoardType}
                                className={`row-start-2`}
                            />

                            <RowOptions
                                rowOptions={rowOptions}
                                setRowOptions={setRowOptions}
                                isDesktop={isDesktop}
                                isOwner={isOwner}
                                className={`row-start-3`}
                            />
                        </div>
                    </TabsContent>
                    <TabsContent
                        value="users"
                        className={`row-start-2 row-end-3 grid grid-rows-subgrid overflow-y-scroll data-[state="inactive"]:hidden`}
                    >
                        <BoardUsersArea
                            users={invitedUsers}
                            board={boardData}
                        />
                    </TabsContent>
                </Tabs>
            </section>
        )
    }
}
