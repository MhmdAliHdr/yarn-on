import { useState } from 'react'
import './App.css'
import Section from "./components/Section"
import type { Section_Type } from "./types/section"
import type { Pattern } from './types/pattern'
import { usePDF } from "react-to-pdf"



function App() {
  const { toPDF, targetRef } = usePDF({filename: "pattern.pdf"})
  const [ currentPattern, setCurrentPattern ] = useState<Pattern>({title: "No Title", author: "No Author", image: "No Image", difficulty: "Easy", sections: []})
  if(JSON.parse(localStorage.getItem("savedPatterns")) == null){
    const savedPatterns = [currentPattern]
    localStorage.setItem("savedPatterns", JSON.stringify(savedPatterns))
  }
  return (
    <>
      <h1>Yarn On</h1>
      <h2>Change Pattern:</h2>
        <select id="selected_pattern" onChange={() => {changePattern()}}>
        {JSON.parse(localStorage.getItem("savedPatterns"))?.map(pattern =>
          <option key={pattern.title}>{pattern.title}</option>
        )}
      </select>
      <><input type="text" id="pattern_name"></input><button onClick={() => {changeTitle()}}>Change Title</button>
      <input type="text" id="pattern_author"></input><button onClick={() => {changeAuthor()}}>Change Author</button></>
      <h2>Change Difficulty</h2>
      <select id="pattern_difficulty" onChange={() => {changeDifficulty()}}>
        <option value="Easy">Easy</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Difficult">Difficult</option>
      </select>
      <h2>Image URL:</h2>
      <input type="text" id="pattern_image" onInputCapture={changeImage}></input>
      <div ref={targetRef}>
      <h2 id="title">{currentPattern.title}</h2>
      <h2 id="author">By {currentPattern.author}</h2>
      <h2 id="difficulty">Level: {currentPattern.difficulty}</h2>
      <img id="pattern_image_tag" src={currentPattern.image}></img>
      {currentPattern.sections.map(section =>
        <>
        <Section key={section.name} name={section.name} rows={section.rows}/>
        {!section.rows[section.rows.length - 1].finished?
          <>
          <input type="button" value="+" onClick={addRow}></input>
          <input type="button" value="-" onClick={removeRow}></input>
          </> : <></>
        }
        </>
      )}
      <input type="text" id="new_section_name"></input>
      <input type="button" value="+" onClick={addSection}></input>
      <input type="button" value="-" onClick={removeSection}></input>
      <button onClick={() => savePattern()}>Save</button><button onClick={() => toPDF()}>Export to PDF</button>
      </div>
    </>
  )
  function savePattern(){
    var savedPatterns = JSON.parse(localStorage.getItem("savedPatterns"))
    if(localStorage.getItem("savedPatterns") != null){
      console.log(currentPattern)
      savedPatterns.push(currentPattern)
    }
    else {
      savedPatterns = [currentPattern]
    }
    localStorage.setItem("savedPatterns", JSON.stringify(savedPatterns))
  }
  function changePattern(){
    const newPattern = JSON.parse(localStorage.getItem("savedPatterns")).filter((p) => {return (p.title == document.getElementById("selected_pattern").value)})[0]
    setCurrentPattern(newPattern)
  }
  function changeTitle(){
    const newTitle = document.getElementById("pattern_name").value
    const changedPattern = {title: newTitle, author: currentPattern.author, image: currentPattern.image, difficulty: currentPattern.difficulty, sections: currentPattern.sections}
    setCurrentPattern(changedPattern)
  }
  function changeAuthor(){
    const newAuthor = document.getElementById("pattern_author").value
    const changedPattern = {title: currentPattern.title, author: newAuthor, image: currentPattern.image, difficulty: currentPattern.difficulty, sections: currentPattern.sections}
    setCurrentPattern(changedPattern)
  } 
  function changeDifficulty(){
    const newDifficulty = document.getElementById("pattern_difficulty").value
    const changedPattern = {title: currentPattern.title, author: currentPattern.author, image: currentPattern.image, difficulty: newDifficulty, sections: currentPattern.sections}
    setCurrentPattern(changedPattern)
  }
  function changeImage(){
    const imageURL = document.getElementById("pattern_image").value
    const changedPattern = {title: currentPattern.title, author: currentPattern.author, image: imageURL, difficulty: currentPattern.difficulty, sections: currentPattern.sections}
    setCurrentPattern(changedPattern)
  }
  function addSection(){
    const new_section_name = document.getElementById("new_section_name").value
    if(currentPattern.sections.length > 0){
      var last_section = currentPattern.sections[currentPattern.sections.length - 1]
      var last_row_of_last_section = last_section.rows[last_section.rows.length - 1]
      last_row_of_last_section = {row_number: last_row_of_last_section.row_number, stitches: last_row_of_last_section.stitches, input:last_row_of_last_section.input, 
      finished: true, final_stitch_count: last_row_of_last_section.final_stitch_count}
      var last_section_rows = last_section.rows
      last_section_rows.pop()
      last_section_rows = [...last_section_rows, last_row_of_last_section]
      const new_empty_section = {name: new_section_name, rows: [{row_number: 1, stitches: [], input:"", finished: false, final_stitch_count: 0}]}
      currentPattern.sections.pop()
      var newSections = [...currentPattern.sections, last_section]
      newSections = [...newSections, new_empty_section]
      const changedPattern = {title: currentPattern.title, author: currentPattern.author, image: currentPattern.image, difficulty: currentPattern.difficulty, sections: newSections}
      setCurrentPattern(changedPattern)
    }
    else{
      const new_empty_section = {name: new_section_name, rows: [{row_number: 1, stitches: [], input:"", finished: false, final_stitch_count: 0}]}
      var newSections = [...currentPattern.sections, new_empty_section]
      const changedPattern = {title: currentPattern.title, author: currentPattern.author, image: currentPattern.image, difficulty: currentPattern.difficulty, sections: newSections}
      setCurrentPattern(changedPattern)
    }
  }
  function removeSection(){
    const sections = currentPattern.sections
    const newSections = sections.slice(0, (sections.length - 1))
    const changedPattern = {title: currentPattern.title, author: currentPattern.author, image: currentPattern.image, difficulty: currentPattern.difficulty, sections: newSections}
    setCurrentPattern(changedPattern)
  }
  function addRow(){
    const section = currentPattern.sections[currentPattern.sections.length - 1]
    const new_empty_row = {row_number: section.rows.length + 1, stitches: [], input:"", finished: false, final_stitch_count: 0}
    if(section.rows.length > 0){
        section.rows[section.rows.length - 1].finished = true
        section.rows[section.rows.length - 1].stitches = document.getElementById("latest_row").value
    }
    const new_rows = [...section.rows, new_empty_row]
    const new_section = {"name": section.name, "rows": new_rows}
    const index_of_section = currentPattern.sections.findIndex((s) => {return (s == section) })
    const new_sections = currentPattern.sections.toSpliced(index_of_section, 1).toSpliced(index_of_section, 0, new_section)
    const new_pattern = {title: currentPattern.title, author: currentPattern.author, image: currentPattern.image, difficulty: currentPattern.difficulty, sections: new_sections}
    setCurrentPattern(new_pattern)
    }
    function removeRow(){
        const new_rows = section.rows.slice(0, (section.rows.length - 1))
    }
}
export default App
