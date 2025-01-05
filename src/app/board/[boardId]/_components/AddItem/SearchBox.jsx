import { useState } from "react"
import { Input } from "@components/ui/input"
import { Button } from "@components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu"

export default function SearchBox({
    onChangeSearch,
    debouncedTerm,
    queryTypesList,
    queryType,
    setQueryType,
}) {
    const [open, setOpen] = useState(false)

    return (
        <div className="flex w-full flex-row items-center rounded-md">
            <Input
                autoFocus
                type="search"
                className={`my-2 h-14 w-full border-2 border-zinc-300 bg-zinc-100 p-2 pl-28 text-black focus-within:border-zinc-200 focus-visible:border-zinc-200 focus-visible:outline-offset-0 md:h-14 md:p-4 md:pl-28 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white`}
                placeholder={"Search by " + queryType}
                onChange={onChangeSearch}
                value={debouncedTerm}
            ></Input>

            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="sm"
                        className={`absolute ml-2 min-w-14 rounded-sm`}
                    >
                        {queryType}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[200px]">
                    <DropdownMenuLabel>Search For</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup onChange={(value) => console.log(value)}>
                        {queryTypesList.map((queryType) => (
                            <DropdownMenuItem
                                key={queryType}
                                value={queryType}
                                onSelect={(queryType) =>
                                    setQueryType(queryType.target.textContent)
                                }
                            >
                                {queryType}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
