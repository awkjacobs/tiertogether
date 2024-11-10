import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"

// ! disabled not working for some reason

const BEFORE_CLASSES = ""

export default function ThemeSelector({ isDesktop, isOwner }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [theme, setTheme] = useState(searchParams.get("theme"))

    function handleThresholdChange(value) {
        setTheme(value)
    }

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams)
            params.set(name, value)

            return params.toString()
        },
        [searchParams],
    )

    return (
        <div>
            <Label
                htmlFor="themeSelector"
                className={`flex flex-row gap-4 text-purple-800 dark:text-purple-400`}
            >
                Theme
            </Label>
            <ToggleGroup
                type="single"
                variant="outline"
                id="themeSelector"
                className={`mt-2`}
                disabled={!isOwner}
                value={theme}
                onValueChange={(value) => handleThresholdChange(value)}
            >
                <ToggleGroupItem
                    value={"eva"}
                    color="purple"
                    className={`flex-1 dark:hover:after:text-emerald-500 dark:hover:after:content-['|']`}
                    asChild
                >
                    <Link
                        href={
                            // <pathname>?theme=eva
                            pathname + "?" + createQueryString("theme", "eva")
                        }
                    >
                        Eva
                    </Link>
                </ToggleGroupItem>
                <ToggleGroupItem value={"fun"} className={`flex-1`} asChild>
                    <Link
                        href={
                            // <pathname>?theme=fun
                            pathname + "?" + createQueryString("theme", "fun")
                        }
                    >
                        Funfetti
                    </Link>
                </ToggleGroupItem>
                <ToggleGroupItem
                    color={"amber"}
                    value={"crm"}
                    className={`flex-1`}
                    asChild
                >
                    <Link
                        href={
                            // <pathname>?theme=crm
                            pathname + "?" + createQueryString("theme", "crm")
                        }
                    >
                        Creamsicle
                    </Link>
                </ToggleGroupItem>
            </ToggleGroup>
        </div>
    )
}
