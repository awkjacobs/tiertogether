export default function TextLink({ children, href, newTab }) {
    return (
        <a
            href={href}
            target={newTab ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className={`decoration-purple-600 hover:bg-purple-600/30 dark:decoration-purple-400 dark:hover:bg-purple-400/30`}
        >
            {children}
        </a>
    )
}
