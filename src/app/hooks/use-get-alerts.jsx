import { PRISMA_GET_ALERTS } from "@api/prismaFuncs"
import { useQuery } from "@tanstack/react-query"

export const useGetAlert = () => {
    return useQuery({
        queryKey: ["alerts"],
        queryFn: PRISMA_GET_ALERTS,
    })
}
