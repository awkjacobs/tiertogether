export default function UserBoardsContainer({ children }) {
    return (
        <div
            className={`mb-4 flex flex-wrap gap-4 overflow-visible rounded bg-zinc-300 p-4 md:p-8 dark:bg-zinc-900`}
        >
            {children}
        </div>
    )
}
