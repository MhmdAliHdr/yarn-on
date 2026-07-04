import type { Section_Type } from "./section"
interface Pattern {
    name: string
    author: string
    difficulty: "Easy" | "Intermediate" | "Difficult"
    sections: Section_Type[]
}
export type { Pattern }