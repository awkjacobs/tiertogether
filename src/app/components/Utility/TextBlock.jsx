import { cn } from "@lib/utils"

export default function TextBlock({ children, className }) {
    return (
        <article
            className={cn(
                `prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black md:prose-h1:text-5xl md:prose-h2:text-4xl md:prose-h3:text-3xl md:prose-h4:text-2xl md:prose-h5:text-xl md:prose-h6:text-lg dark:prose-headings:text-white dark:prose-a:text-purple-300 dark:prose-a:hover:text-purple-400 prose-a:text-purple-600 prose-a:hover:text-purple-700 dark:prose-p:text-white dark:prose-ul:text-white dark:prose-hr:border-purple-400 relative z-50 col-span-1 col-start-3 mx-auto`,
                className,
            )}
        >
            {children}
        </article>
    )
}
