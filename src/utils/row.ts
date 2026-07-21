import type { Pattern } from "../types/pattern";
import type { Row_Type } from "../types/row";
import type { Section_Type } from "../types/section";

export function addRow(latestRow: Row_Type | undefined, currentPattern: Pattern){
    // The last section is referenced
    const section = currentPattern.sections[currentPattern.sections.length - 1];
    // The last row is referenced
    console.log(latestRow)
    // A new empty row is initialized
    const new_empty_row = {row_number: section.rows.length + 1, stitches: "", input:"", img: undefined, finished: false, final_stitch_count: 0}
    // If the section has existing rows
    if((section.rows) && (section) && (section.rows[section.rows.length - 1])  && (section.rows.length > 0)){
      // They are finalized
        const last_row = section.rows[section.rows.length - 1] ?? {row_number: 1, stitches: "", input:"", img: undefined, finished: false, final_stitch_count: 0}
        last_row.finished = true
        last_row.stitches = latestRow?.stitches
        last_row.img = latestRow?.img
        last_row.final_stitch_count = latestRow?.final_stitch_count
        section.rows[section.rows.length - 1] = last_row
    }
    // A new array of rows including the new empty row is initialized
    const new_rows = [...section.rows, new_empty_row]
    // The new row is added and the current pattern is re-rendered
    const new_section = {"name": section.name, "rows": new_rows}
    const index_of_section = currentPattern.sections.findIndex((s) => {return (s == section) })
    const new_sections = currentPattern.sections.toSpliced(index_of_section, 1).toSpliced(index_of_section, 0, new_section)
    const new_pattern = {title: currentPattern.title, author: currentPattern.author, image: currentPattern.image, difficulty: currentPattern.difficulty, sections: new_sections}
    return new_pattern
}

export function removeRow(currentPattern: Pattern){
      // The last section is referenced
      const section = currentPattern.sections[currentPattern.sections.length - 1]
      // The last finished row is removed
      const last_row = section.rows.pop()
      section.rows.pop()
      const new_rows = [...section.rows, last_row]
      // The last section is mutated accordingly
      const new_section: Section_Type = {"name": section.name, "rows": new_rows}
      const index_of_section = currentPattern.sections.findIndex((s) => {return (s == section) })
      const new_sections = currentPattern.sections.toSpliced(index_of_section, 1).toSpliced(index_of_section, 0, new_section)
      // Re-rendering the current pattern
      const new_pattern = {title: currentPattern.title, author: currentPattern.author, image: currentPattern.image, difficulty: currentPattern.difficulty, sections: new_sections}
      return new_pattern
}

export function changeRowStitches(row: Row_Type | undefined, currentPattern: Pattern, stitches: string){
  const last_section: Section_Type = currentPattern.sections[currentPattern.sections.length - 1]
  const newLastRow: Row_Type = {row_number: last_section.rows.findIndex((r) => { return (r ==row)} )
                                , stitches: stitches, input: row?.input, img: row?.img, finished: false, final_stitch_count: row?.final_stitch_count};
  last_section.rows.pop()
  const newLastSection: Section_Type = {"name": last_section.name, "rows": [...last_section.rows, newLastRow]}
  currentPattern.sections.pop()
  const newPattern: Pattern = {"title": currentPattern.title, "author": currentPattern.author, "difficulty": currentPattern.difficulty, "image": currentPattern.image, "sections": [...currentPattern.sections, newLastSection]}
  return newPattern
}

export function changeRowFinalCount(row: Row_Type | undefined, currentPattern: Pattern, final_stitch_count: number){
  const last_section: Section_Type = currentPattern.sections[currentPattern.sections.length - 1]
  const newLastRow: Row_Type = {row_number: last_section.rows.findIndex((r) => { return (r ==row)} )
                                , stitches: row?.stitches, input: row?.input, img: row?.img, finished: false, final_stitch_count: final_stitch_count};
  last_section.rows.pop()
  const newLastSection: Section_Type = {"name": last_section.name, "rows": [...last_section.rows, newLastRow]}
  currentPattern.sections.pop()
  const newPattern: Pattern = {"title": currentPattern.title, "author": currentPattern.author, "difficulty": currentPattern.difficulty, "image": currentPattern.image, "sections": [...currentPattern.sections, newLastSection]}
  return newPattern
}

export function changeRowImage(row: Row_Type | undefined, currentPattern: Pattern, imageURL: string){
  const last_section: Section_Type = currentPattern.sections[currentPattern.sections.length - 1]
  const newLastRow: Row_Type = {row_number: last_section.rows.findIndex((r) => { return (r ==row)} )
                                , stitches: row?.stitches, input: row?.input, img: imageURL, finished: false, final_stitch_count: row?.final_stitch_count};
  last_section.rows.pop()
  const newLastSection: Section_Type = {"name": last_section.name, "rows": [...last_section.rows, newLastRow]}
  currentPattern.sections.pop()
  const newPattern: Pattern = {"title": currentPattern.title, "author": currentPattern.author, "difficulty": currentPattern.difficulty, "image": currentPattern.image, "sections": [...currentPattern.sections, newLastSection]}
  return newPattern
}