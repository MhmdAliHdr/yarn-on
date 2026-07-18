import type { Section_Type } from "./section"
interface Pattern {
    title: string
    author: string
    difficulty: "Easy" | "Intermediate" | "Difficult"
    image: string
    sections: Section_Type[]
}
export type { Pattern }