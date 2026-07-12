import { useState } from 'react'
import './App.css'
import Section from "./components/Section"
import type { Section_Type } from "./types/section"
import { usePDF } from "react-to-pdf"



function App() {
  const [sections, setSections] = useState<Section_Type[]>([{name: "Front Panel", rows: [{row_number: 1, stitches: [], input:"", finished: false, final_stitch_count: 0}, ]}, {name: "Back Panel", rows: [{row_number: 1, stitches: [], input:"", finished: false, final_stitch_count: 0}, ]}])
  const { toPDF, targetRef } = usePDF({filename: "pattern.pdf"})
  const [ image, setImage ] = useState<string>("")
  const [ title, setTitle ] = useState<string>("")
  return (
    <>
    <h1>Yarn On</h1>
      <><input type="text" id="pattern_name"></input><button onClick={() => {setTitle(document.getElementById("pattern_name").value)}}>Change Title</button></>
      <input type="file" id="pattern_image" onInputCapture={addImage}></input>
      <div ref={targetRef}>
      <h2>{title}</h2>
      <img id="pattern_image_tag" src={image}></img>
      {sections.map(section =>
        <Section key={section.name} name={section.name} rows={section.rows}/>
      )}
      <input type="text" id="new_section_name"></input>
      <input type="button" value="+" onClick={addSection}></input>
      <input type="button" value="-" onClick={removeSection}></input>
      <button onClick={() => toPDF()}>Export to PDF</button>
      </div>
    </>
  )
  function addSection(){
    const new_section_name = document.getElementById("new_section_name").value
    const new_empty_section = {name: new_section_name, rows: [{row_number: 1, stitches: ["sc"], input:"", finished: false, final_stitch_count: 0}, ]}
    const new_sections = [...sections, new_empty_section]
    setSections(new_sections)
  }
  function removeSection(){
    const new_sections = sections.slice(0, (sections.length - 1))
    setSections(new_sections)
  }
  function addImage(){
    const uploaded_image = document.getElementById("pattern_image").value
    setImage(uploaded_image.replace("C:\\fakepath\\", ""))
  }
}
export default App
