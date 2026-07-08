import { useState } from 'react'
import './App.css'
import Section from "./components/Section"
import type { Section_Type } from "./types/section"



function App() {
  const [sections, setSections] = useState<Section_Type[]>([{name: "Front Panel", rows: [{row_number: 1, stitches: [], input:"", finished: false, final_stitch_count: 0}, ]}, {name: "Back Panel", rows: [{row_number: 1, stitches: [], input:"", finished: false, final_stitch_count: 0}, ]}])
  return (
    <>
      {sections.map(section =>
        <Section key={section.name} name={section.name} rows={section.rows}/>
      )}
      <input type="text" id="new_section_name"></input>
      <input type="button" value="+" onClick={addSection}></input>
    </>
  )
  function addSection(){
    const new_section_name = document.getElementById("new_section_name").value
    const new_empty_section = {name: new_section_name, rows: [{row_number: 1, stitches: ["sc"], input:"", finished: false, final_stitch_count: 0}, ]}
    const new_sections = [...sections, new_empty_section]
    setSections(new_sections)
  }
}
export default App
