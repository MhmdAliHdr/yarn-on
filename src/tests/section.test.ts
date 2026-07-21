import { describe, expect, it } from "vitest";
import type { Pattern } from "../types/pattern";
import { addSection, removeSection } from "../utils/section";


describe("Adding a section to a pattern", () => {
  it("Section successfully added", () => {
    const aPattern: Pattern = {"title": "Some Title", "author": "Some Author", "image": "Some Image", "difficulty": "Easy",
         "sections": [{"name": "A Section", "rows": [{
             "row_number": 1, "finished": true,
             stitches: "sc, sc, sc, sc, sc",
             input: "",
             final_stitch_count: 5,
             img: undefined
         },
         {
             "row_number": 2, "finished": false,
             stitches: "inc, inc, inc, inc, inc",
             input: "",
             final_stitch_count: 10,
             img: undefined
         }
        ]}]}
    const changedPattern: Pattern = addSection("New Section", aPattern)
    expect(changedPattern.sections.length).toBe(2);
  });
});

describe("Removing a section from a pattern", () => {
  it("Section successfully removed", () => {
    const aPattern: Pattern = {"title": "Some Title", "author": "Some Author", "image": "Some Image", "difficulty": "Easy",
         "sections": [{"name": "A Section", "rows": [{
             "row_number": 1, "finished": true,
             stitches: "sc, sc, sc, sc, sc",
             input: "",
             final_stitch_count: 5,
             img: undefined
         },
         {
             "row_number": 2, "finished": false,
             stitches: "inc, inc, inc, inc, inc",
             input: "",
             final_stitch_count: 10,
             img: undefined
         }
        ]}]}
    const changedPattern: Pattern = removeSection(aPattern)
    expect(changedPattern.sections.length).toBe(0);
  });
});