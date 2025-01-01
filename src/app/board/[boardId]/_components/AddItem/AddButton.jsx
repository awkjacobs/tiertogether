import AddDialogContent from "./AddDialogContent"
import { ResponsiveDialog } from "@components/ui/ResponsiveDialog"
import { Plus } from "lucide-react"
import { useMediaQuery } from "@app/hooks/use-media-query"

export default function AddButton() {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    return (
        <ResponsiveDialog
            title="Add a New Title"
            trigger={<Plus className={`h-4 w-4 text-white`} />}
            triggerSize={isDesktop ? "" : "icon"}
            triggerClasses={`z-10 bg-emerald-500 dark:bg-emerald-500 hover:bg-emerald-400 hover:dark:bg-emerald-400 md:h-12`}
            dialogClasses={`top-[2.5%] translate-y-0 max-h-[95vh] md:max-w-screen-md`}
            component={<AddDialogContent />}
            hideDescription={true}
            tooltip="Add a New Title"
        />
    )
}
