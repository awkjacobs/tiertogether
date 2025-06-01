import { atom } from "jotai"

/**
 * Currently selected item ID
 * @type {import('jotai').PrimitiveAtom<string>}
 */
export const selectedItemAtom = atom("")

/**
 * Controls the visibility of the info dialog
 * @type {import('jotai').PrimitiveAtom<boolean>}
 */
export const dialogIsOpenAtom = atom(false)

/**
 * Shows difference indicators in the UI
 * @type {import('jotai').PrimitiveAtom<boolean>}
 */
export const showDifferenceAtom = atom(false)

/**
 * Currently active/dragging item
 * @type {import('jotai').PrimitiveAtom<Object|null>}
 */
export const activeItemAtom = atom(null)

/**
 * Controls the visibility of the card queue
 * @type {import('jotai').PrimitiveAtom<boolean>}
 */
export const queueIsOpenAtom = atom(true)

/**
 * Card size multiplier for display
 * @type {import('jotai').PrimitiveAtom<number>}
 */
export const cardSizeAtom = atom(1)
