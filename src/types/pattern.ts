import type { Section } from "./section"
interface Pattern {
    name: string
    author: string
    difficulty: "Easy" | "Intermediate" | "Difficult"
    sections: Section[]
}
export type { Pattern }