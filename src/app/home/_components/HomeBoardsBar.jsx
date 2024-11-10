import InviteUserButton from "@/app/components/Buttons/InviteUserButton"
import AddBoardButton from "@/components/Buttons/AddBoardButton"

export default function HomeBoardsBar({ appData }) {
    return (
        <div
            className={`my-2 flex items-center justify-between gap-2 md:flex-row md:gap-4 md:py-6`}
        >
            <h1
                className={`flex-1 text-base font-bold text-purple-700 md:text-2xl dark:text-purple-200`}
            >
                My Boards
            </h1>
            {/* <InviteUserButton size={"icon"} /> */}
            <AddBoardButton appData={appData} />
        </div>
    )
}
