import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Label } from "@/components/ui/label"

export default function DesignateNewBoardOwner({ users, setSelectedUser }) {
    return (
        <>
            <Label
                htmlFor="userSelector"
                className={`mt-4 text-purple-800 dark:text-purple-400`}
            >
                New Board Owner
            </Label>
            <Select
                className=""
                onValueChange={(value) => setSelectedUser(value)}
            >
                <SelectTrigger className="mb-4 outline outline-1 outline-zinc-400 dark:outline dark:outline-1 dark:outline-zinc-800">
                    <SelectValue placeholder="Select a new Board Owner" />
                </SelectTrigger>
                <SelectContent className="z-[9999]">
                    <SelectGroup>
                        {users.map((user) => (
                            <SelectItem
                                key={user.id}
                                value={user.id}
                                id={user.id}
                                className="focus:bg-purple-600/50 dark:focus:bg-purple-600/50"
                            >
                                {user.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}
