import type { Pattern } from "./pattern"
import type { Section_Type } from "./section"
interface SectionProps {
    currentPattern: Pattern
    section: Section_Type
    onChange: ((p: Pattern) => void)
}
export type { SectionProps }