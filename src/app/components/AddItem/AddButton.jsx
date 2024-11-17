import AddDialogContent from "./AddDialogContent"
import { ResponsiveDialog } from "../ui/ResponsiveDialog"
import { Plus } from "lucide-react"

export default function AddButton(props) {
    return (
        <ResponsiveDialog
            title="Add a New Title"
            trigger={<Plus className={`h-4 w-4 text-white`} />}
            triggerSize={props.isDesktop ? "" : "icon"}
            dialogClasses={`top-[2.5%] translate-y-0 max-h-[95vh] md:max-w-screen-md`}
            triggerClasses={`z-10 bg-emerald-500 dark:bg-emerald-500 hover:bg-emerald-400 hover:dark:bg-emerald-400 md:h-12`}
            component={<AddDialogContent {...props} />}
            hideDescription={true}
        />
    )
}
