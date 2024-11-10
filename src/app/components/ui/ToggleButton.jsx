import { ToggleGroupItem } from "@/components/ui/toggle-group"

export default function ToggleButton({ value, icon, className }) {
    return (
        <ToggleGroupItem
            className={`flex-1 flex-col h-fit p-2 ${className}`}
            value={value}
        >
            {value}
            {icon}
        </ToggleGroupItem>
    )
}
