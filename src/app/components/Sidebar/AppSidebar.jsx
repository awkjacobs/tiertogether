import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@components/ui/sidebar"
import AddBoardButton from "../Buttons/AddBoardButton"
import ProfileButton from "../AppBar/_components/Drawer/Drawer Components/ProfileButton"
import { PRISMA_GET_USER } from "@api/prismaFuncs"
import Link from "next/link"
import BoardTypeIcon from "../Utility/BoardTypeIcons"
import Crown from "../Utility/Crown"
import EditBoardButton from "../Buttons/EditBoardButton"
import { EllipsisVertical } from "lucide-react"

export default async function AppSidebar({ appData }) {
    // console.log(appData)
    // const userBoards = appData?.user.boards
    const user = await PRISMA_GET_USER()
    console.log(user)
    return (
        <Sidebar
            side="right"
            className={`border-zinc-300 dark:border-zinc-800`}
        >
            <SidebarHeader>
                <ProfileButton user={user} />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>My Boards</SidebarGroupLabel>
                    <SidebarMenu>
                        {user.boards.map((board) => {
                            return (
                                <SidebarMenuItem key={board.id}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={`/board/${board.id}`}
                                            className={`transition-all hover:bg-purple-500/10 active:bg-purple-400/20 md:py-2 dark:hover:bg-purple-400/10`}
                                        >
                                            <BoardTypeIcon
                                                type={board.type}
                                                className={`h-5 w-5 text-purple-700 dark:text-purple-200`}
                                            />
                                            <span>{board.boardName}</span>
                                            {user.id === board.ownerId && (
                                                <Crown />
                                            )}
                                        </Link>
                                    </SidebarMenuButton>
                                    <SidebarMenuAction>
                                        <EllipsisVertical />
                                        {/* <EditBoardButton
                                            appData={appData}
                                            board={board}
                                            // isOwner={isOwner}
                                        /> */}
                                    </SidebarMenuAction>
                                </SidebarMenuItem>
                            )
                        })}
                        <AddBoardButton appData={appData} />
                    </SidebarMenu>
                </SidebarGroup>
                {/* <section
                    className={`my-2 flex flex-1 flex-col gap-4 overflow-hidden md:my-4`}
                >
                    <div className={`overflow-y-scroll`}>
                        <div
                        // className={`rounded bg-zinc-200/50 p-2 md:p-4 dark:bg-zinc-900/50`}
                        > */}
                {/* {SORTED_BOARDS(userBoards).map((board) => { */}
                {/* return (
                                    <BoardLinks
                                        appData={appData}
                                        key={board.id}
                                        board={board}
                                        thisUser={appData.user}
                                    />
                                ) */}
                {/* })} */}
                {/* </div>
                    </div> */}
                {/* </section> */}

                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
