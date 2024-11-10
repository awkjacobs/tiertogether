import { LoadingSpinner } from "@/components/ui/LoadingSpinner"
export default function SearchLoadingContainer() {
    return (
        <div className={`flex w-full flex-1 items-center justify-center`}>
            <LoadingSpinner size={96} className={`text-purple-500`} />
        </div>
    )
}
