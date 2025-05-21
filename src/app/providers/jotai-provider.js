"use client"

import { Provider } from "jotai"

export const JotiaProvider = ({ children }) => {
    return <Provider>{children}</Provider>
}
