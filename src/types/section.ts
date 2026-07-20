import type { Row_Type } from "./row"
interface Section_Type {
    name: string
    rows: (Row_Type | undefined)[]
}
export type { Section_Type }