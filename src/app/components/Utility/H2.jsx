export default function H2({ children }) {
    return (
        <h2
            className={`text-2xl font-bold text-purple-700 md:text-4xl dark:text-purple-300`}
        >
            {children}
        </h2>
    )
}
