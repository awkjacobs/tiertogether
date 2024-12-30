export default function PageContainer({ children }) {
    return (
        <section
            className={`mx-auto my-0 h-svh w-full items-center justify-start bg-surface-200 p-2 pb-0 dark:bg-surface-950`}
            style={{
                display: `grid`,
                gridTemplateColumns: `
                [left-side-start] 
                1fr
                [left-side-end main-content-start] 
                2fr
                [query-start] 
                min(calc(100vw - 2rem), 75rem) 
                [query-end] 
                2fr
                [main-content-end right-side-start] 
                1fr 
                [right-side-end]`,
                gridTemplateRows: `min-content 1fr`,
            }}
        >
            {children}
        </section>
    )
}
