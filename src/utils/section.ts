import type { Pattern } from '../types/pattern'


export function addSection(new_section_name: string, currentPattern: Pattern){
    // The name of the new section is referenced
    // If there are already previous sections in the current pattern
    if(currentPattern.sections.length > 0){
      // The final row's input is finalized
      var last_section = currentPattern.sections[currentPattern.sections.length - 1]
      var last_row_of_last_section = last_section.rows[last_section.rows.length - 1] ?? {row_number: 1, stitches: "", input:"", 
      finished: true, img: undefined, final_stitch_count: 0}
      last_row_of_last_section = {row_number: last_row_of_last_section.row_number, stitches: last_row_of_last_section.stitches, input:last_row_of_last_section.input, 
      finished: true, img: last_row_of_last_section.img, final_stitch_count: last_row_of_last_section.final_stitch_count}
      var last_section_rows = last_section.rows
      last_section_rows.pop()
      last_section_rows = [...last_section_rows, last_row_of_last_section]
      last_section = {"name": last_section.name, "rows": last_section_rows}
      // An empty section is created with the chosen name
      const new_empty_section = {name: new_section_name, rows: [{row_number: 1, stitches: "", input:"", img: undefined, finished: false, final_stitch_count: 0}]}
      // The last section is finalized
      currentPattern.sections.pop()
      var newSections = [...currentPattern.sections, last_section]
      // The new section is added
      newSections = [...newSections, new_empty_section]
      const changedPattern = {title: currentPattern.title, author: currentPattern.author, image: currentPattern.image, difficulty: currentPattern.difficulty, sections: newSections}
      return changedPattern
    }
    else{
      // If there are no pre-existing sections, we simply add a new empty section to the pattern with the chosen name
      const new_empty_section = {name: new_section_name, rows: [{row_number: 1, stitches:"", input:"", img: undefined, finished: false, final_stitch_count: 0}]}
      var newSections = [...currentPattern.sections, new_empty_section]
      const changedPattern = {title: currentPattern.title, author: currentPattern.author, image: currentPattern.image, difficulty: currentPattern.difficulty, sections: newSections}
      return changedPattern
    }
}

export function removeSection(currentPattern: Pattern){
    // Removes the last section of the patterns
    const sections = currentPattern.sections
    const newSections = sections.slice(0, (sections.length - 1))
    const changedPattern = {title: currentPattern.title, author: currentPattern.author, image: currentPattern.image, difficulty: currentPattern.difficulty, sections: newSections}
    return changedPattern
  }