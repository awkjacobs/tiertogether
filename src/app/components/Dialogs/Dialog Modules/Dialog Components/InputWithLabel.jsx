import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function InputWithLabel({
    onChange,
    value,
    label,
    placeholder,
    isOwner,
    className,
}) {
    return (
        <div className={cn(`md:col-span-1 md:col-start-1`, className)}>
            <Label
                htmlFor="input"
                className={`mb-2 flex flex-row text-purple-800 dark:text-purple-400`}
            >
                {label}
            </Label>
            <Input
                id="input"
                type="text"
                className={`h-10 border-2 border-surface-300 bg-surface-100 p-2 text-black focus-within:border-surface-200 focus-visible:border-surface-200 focus-visible:outline-offset-0 md:h-14 md:p-4 dark:border-surface-800 dark:bg-surface-900 dark:text-white`}
                onChange={onChange}
                placeholder={placeholder}
                value={value}
                disabled={!isOwner}
            ></Input>
        </div>
    )
}
