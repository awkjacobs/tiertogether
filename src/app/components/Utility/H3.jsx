export default function H3({ children }) {
    return (
        <h2
            className={`text-xl font-bold text-purple-700 md:text-2xl dark:text-purple-300`}
        >
            {children}
        </h2>
    )
}
