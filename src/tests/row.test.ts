import { describe, expect, it } from "vitest";
import type { Pattern } from "../types/pattern";
import { addRow, changeRowFinalCount, changeRowImage, changeRowStitches, removeRow } from "../utils/row";
import type { Row_Type } from "../types/row";
import type { Section_Type } from "../types/section";


describe("Removing a row from a pattern's last section", () => {
  it("Row successfully removed", () => {
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
    const changedPattern: Pattern = removeRow(aPattern)
    console.log(changedPattern.sections[0].rows)
    expect(changedPattern.sections[0].rows.length).toBe(1);
  });
});

describe("Adding a row to a pattern's last section", () => {
  it("Row successfully removed", () => {
    const latestRow: Row_Type = 
         {
             "row_number": 2, "finished": false,
             stitches: "inc, inc, inc, inc, inc",
             input: "",
             final_stitch_count: 10,
             img: undefined
         }
    const aPattern: Pattern = {"title": "Some Title", "author": "Some Author", "image": "Some Image", "difficulty": "Easy",
         "sections": [{"name": "A Section", "rows": [{
             "row_number": 1, "finished": true,
             stitches: "sc, sc, sc, sc, sc",
             input: "",
             final_stitch_count: 5,
             img: undefined
         }, latestRow
        ]}]}
    const changedPattern: Pattern = addRow(latestRow, aPattern)
    console.log(changedPattern.sections[0].rows)
    expect(changedPattern.sections[0].rows.length).toBe(3);
  });
});

describe("Changing a row's stitches", () => {
  it("Row successfully changed", () => {
    const latestRow: Row_Type = 
         {
             "row_number": 2, "finished": false,
             stitches: "inc, inc, inc, inc, inc",
             input: "",
             final_stitch_count: 10,
             img: undefined
         }
    const aPattern: Pattern = {"title": "Some Title", "author": "Some Author", "image": "Some Image", "difficulty": "Easy",
         "sections": [{"name": "A Section", "rows": [{
             "row_number": 1, "finished": true,
             stitches: "sc, sc, sc, sc, sc",
             input: "",
             final_stitch_count: 5,
             img: undefined
         }, latestRow
        ]}]}
    const changedPattern: Pattern = changeRowStitches(latestRow, aPattern, "dc, dc, dc, dc, dc")
    const lastSection: Section_Type = changedPattern.sections[changedPattern.sections.length - 1]
    const changedLastRow: Row_Type | undefined = lastSection.rows[lastSection.rows.length - 1]
    expect(changedLastRow?.stitches).toBe("dc, dc, dc, dc, dc");
  });
});

describe("Changing a row's final stitch count", () => {
  it("Row successfully changed", () => {
    const latestRow: Row_Type = 
         {
             "row_number": 2, "finished": false,
             stitches: "inc, inc, inc, inc, inc",
             input: "",
             final_stitch_count: 10,
             img: undefined
         }
    const aPattern: Pattern = {"title": "Some Title", "author": "Some Author", "image": "Some Image", "difficulty": "Easy",
         "sections": [{"name": "A Section", "rows": [{
             "row_number": 1, "finished": true,
             stitches: "sc, sc, sc, sc, sc",
             input: "",
             final_stitch_count: 5,
             img: undefined
         }, latestRow
        ]}]}
    const changedPattern: Pattern = changeRowFinalCount(latestRow, aPattern, 3000)
    const lastSection: Section_Type = changedPattern.sections[changedPattern.sections.length - 1]
    const changedLastRow: Row_Type | undefined = lastSection.rows[lastSection.rows.length - 1]
    expect(changedLastRow?.final_stitch_count).toBe(3000);
  });
});

describe("Changing a row's image", () => {
  it("Row successfully changed", () => {
    const latestRow: Row_Type = 
         {
             "row_number": 2, "finished": false,
             stitches: "inc, inc, inc, inc, inc",
             input: "",
             final_stitch_count: 10,
             img: undefined
         }
    const aPattern: Pattern = {"title": "Some Title", "author": "Some Author", "image": "Some Image", "difficulty": "Easy",
         "sections": [{"name": "A Section", "rows": [{
             "row_number": 1, "finished": true,
             stitches: "sc, sc, sc, sc, sc",
             input: "",
             final_stitch_count: 5,
             img: undefined
         }, latestRow
        ]}]}
    const changedPattern: Pattern = changeRowImage(latestRow, aPattern, "Some Image")
    const lastSection: Section_Type = changedPattern.sections[changedPattern.sections.length - 1]
    const changedLastRow: Row_Type | undefined = lastSection.rows[lastSection.rows.length - 1]
    expect(changedLastRow?.img).toBe("Some Image");
  });
});