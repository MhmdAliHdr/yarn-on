import type { Pattern } from "./pattern"
import type { Row_Type } from "./row"
interface RowProps {
    currentPattern: Pattern
    row: Row_Type | undefined
    onChange: ((p: Pattern) => void)
}
export type { RowProps }