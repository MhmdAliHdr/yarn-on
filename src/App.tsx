import { useState } from 'react'
import './App.css'
import Section from "./components/Section"
import type { Pattern } from './types/pattern'
import { usePDF } from "react-to-pdf"



function App() {
  // File is saved as pattern.pdf
  const { toPDF, targetRef } = usePDF({filename: "pattern.pdf"})
  // The app keeps track of one state, the current pattern which refers to currently selected and worked on pattern by the user
  const [ currentPattern, setCurrentPattern ] = useState<Pattern>({title: "No Title", author: "No Author", image: "No Image", difficulty: "Easy", sections: []})
  // If the localStorage key for saved patterns has not been defined yet, define one with an empty list
  if(JSON.parse(localStorage.getItem("savedPatterns")) == null){
    const savedPatterns: Pattern[] = []
    localStorage.setItem("savedPatterns", JSON.stringify(savedPatterns))
  }
  // The main app component
  return (
    <>
      <h1>Yarn On</h1>
      {/*The following select tag allows the user to pick between their saved patterns*/}
      <h2>Change Pattern:</h2>
        <select id="selected_pattern" onChange={() => {changePattern()}}>
        {JSON.parse(localStorage.getItem("savedPatterns"))?.map(pattern =>
          <option key={pattern.title}>{pattern.title}</option>
        )}
      </select>
      {/* Input boxes and buttons to change the pattern name and authors as well as a dropdown menu to select the difficulty*/}
      <><input type="text" id="pattern_name"></input><button onClick={() => {changeTitle()}}>Change Title</button>
      <input type="text" id="pattern_author"></input><button onClick={() => {changeAuthor()}}>Change Author</button></>
      <h2>Change Difficulty</h2>
      <select id="pattern_difficulty" onChange={() => {changeDifficulty()}}>
        <option value="Easy">Easy</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Difficult">Difficult</option>
      </select>
      {/* Pattern URL, Images cannot be directly uploaded, but they can be uploaded to a cloud service and linked here */}
      <h2>Image URL:</h2>
      <input type="text" id="pattern_image" onInputCapture={changeImage}></input>
      {/* The following div is what gets exported as a PDF, everything before it is not included (the input components) */}
      <div ref={targetRef}>
      {/* Pattern details */}
      <h2 id="title">{currentPattern.title}</h2>
      <h2 id="author">By {currentPattern.author}</h2>
      <h2 id="difficulty">Level: {currentPattern.difficulty}</h2>
      <img id="pattern_image_tag" src={currentPattern.image}></img>
      {/* Each section of the pattern is represented by a Section component*/}
      {currentPattern.sections.map(section =>
        <>
        <Section key={section.name} name={section.name} rows={section.rows}/>
        {!section.rows[section.rows.length - 1].finished?
        // Buttons to allow adding and removing rows from a section
          <>
          <input type="button" value="+" onClick={addRow}></input>
          <input type="button" value="-" onClick={removeRow}></input>
          </> : <></>
        }
        </>
      )}
      </div>
      {/* Buttons to allow adding and removing sections */}
      <input type="text" id="new_section_name"></input>
      <input type="button" value="+" onClick={addSection}></input>
      <input type="button" value="-" onClick={removeSection}></input>
      {/* Calls the toPDF function from the react-to-pdf package to export the div as a PDF */}
      <button onClick={() => savePattern()}>Save</button><button onClick={() => toPDF()}>Export to PDF</button>
    </>
  )
  function savePattern(){
    // The currently saved patterns are loaded
    var savedPatterns = JSON.parse(localStorage.getItem("savedPatterns"))
    // If the localStorage includes the key for saved patterns, push it
    if(localStorage.getItem("savedPatterns") != null){
      savedPatterns.push(currentPattern)
    }
    // Else initialize it with an array containing one element, the current pattern being saved
    else {
      savedPatterns = [currentPattern]
    }
    // The array is stringified before saving as localStorage can only store primitive types
    localStorage.setItem("savedPatterns", JSON.stringify(savedPatterns))
  }
  function changePattern(){
    // The selected pattern is loaded and set as the current pattern
    const newPattern = JSON.parse(localStorage.getItem("savedPatterns")).filter((p) => {return (p.title == document.getElementById("selected_pattern").value)})[0]
    setCurrentPattern(newPattern)
  }
  function changeTitle(){
    // The title of the pattern is changed and the current pattern is re-rendered
    const newTitle = document.getElementById("pattern_name").value
    const changedPattern = {title: newTitle, author: currentPattern.author, image: currentPattern.image, difficulty: currentPattern.difficulty, sections: currentPattern.sections}
    setCurrentPattern(changedPattern)
  }
  function changeAuthor(){
    // The author of the pattern is changed and the current pattern is re-rendered
    const newAuthor = document.getElementById("pattern_author").value
    const changedPattern = {title: currentPattern.title, author: newAuthor, image: currentPattern.image, difficulty: currentPattern.difficulty, sections: currentPattern.sections}
    setCurrentPattern(changedPattern)
  } 
  function changeDifficulty(){
    // The difficulty of the pattern is changed and the current pattern is re-rendered
    const newDifficulty = document.getElementById("pattern_difficulty").value
    const changedPattern = {title: currentPattern.title, author: currentPattern.author, image: currentPattern.image, difficulty: newDifficulty, sections: currentPattern.sections}
    setCurrentPattern(changedPattern)
  }
  function changeImage(){
    // The image of the pattern is changed and the current pattern is re-rendered
    const imageURL = document.getElementById("pattern_image").value
    const changedPattern = {title: currentPattern.title, author: currentPattern.author, image: imageURL, difficulty: currentPattern.difficulty, sections: currentPattern.sections}
    setCurrentPattern(changedPattern)
  }
  function addSection(){
    // The name of the new section is referenced
    const new_section_name = document.getElementById("new_section_name").value
    // If there are already previous sections in the current pattern
    if(currentPattern.sections.length > 0){
      // The final row's input is finalized
      var last_section = currentPattern.sections[currentPattern.sections.length - 1]
      var last_row_of_last_section = last_section.rows[last_section.rows.length - 1]
      last_row_of_last_section = {row_number: last_row_of_last_section.row_number, stitches: last_row_of_last_section.stitches, input:last_row_of_last_section.input, 
      finished: true, final_stitch_count: last_row_of_last_section.final_stitch_count}
      var last_section_rows = last_section.rows
      last_section_rows.pop()
      last_section_rows = [...last_section_rows, last_row_of_last_section]
      // An empty section is created with the chosen name
      const new_empty_section = {name: new_section_name, rows: [{row_number: 1, stitches: [], input:"", finished: false, final_stitch_count: 0}]}
      // The last section is finalized
      currentPattern.sections.pop()
      var newSections = [...currentPattern.sections, last_section]
      // The new section is added
      newSections = [...newSections, new_empty_section]
      const changedPattern = {title: currentPattern.title, author: currentPattern.author, image: currentPattern.image, difficulty: currentPattern.difficulty, sections: newSections}
      setCurrentPattern(changedPattern)
    }
    else{
      // If there are no pre-existing sections, we simply add a new empty section to the pattern with the chosen name
      const new_empty_section = {name: new_section_name, rows: [{row_number: 1, stitches: [], input:"", finished: false, final_stitch_count: 0}]}
      var newSections = [...currentPattern.sections, new_empty_section]
      const changedPattern = {title: currentPattern.title, author: currentPattern.author, image: currentPattern.image, difficulty: currentPattern.difficulty, sections: newSections}
      setCurrentPattern(changedPattern)
    }
  }
  function removeSection(){
    // Removes the last section of the patterns
    const sections = currentPattern.sections
    const newSections = sections.slice(0, (sections.length - 1))
    const changedPattern = {title: currentPattern.title, author: currentPattern.author, image: currentPattern.image, difficulty: currentPattern.difficulty, sections: newSections}
    setCurrentPattern(changedPattern)
  }
  function addRow(){
    // The last section is referenced
    const section = currentPattern.sections[currentPattern.sections.length - 1]
    // A new empty row is initialized
    const new_empty_row = {row_number: section.rows.length + 1, stitches: [], input:"", finished: false, final_stitch_count: 0}
    // If the section has existing rows
    if(section.rows.length > 0){
      // They are finalized
        section.rows[section.rows.length - 1].finished = true
        section.rows[section.rows.length - 1].stitches = document.getElementById("latest_row").value
    }
    // A new array of rows including the new empty row is initialized
    const new_rows = [...section.rows, new_empty_row]
    // The new row is added and the current pattern is re-rendered
    const new_section = {"name": section.name, "rows": new_rows}
    const index_of_section = currentPattern.sections.findIndex((s) => {return (s == section) })
    const new_sections = currentPattern.sections.toSpliced(index_of_section, 1).toSpliced(index_of_section, 0, new_section)
    const new_pattern = {title: currentPattern.title, author: currentPattern.author, image: currentPattern.image, difficulty: currentPattern.difficulty, sections: new_sections}
    setCurrentPattern(new_pattern)
    }
    function removeRow(){
      // The last section is referenced
      const section = currentPattern.sections[currentPattern.sections.length - 1]
      // The last finished row is removed
      const last_row = section.rows.pop()
      section.rows.pop()
      const new_rows = [...section.rows, last_row]
      // The last section is mutated accordingly
      const new_section = {"name": section.name, "rows": new_rows}
      const index_of_section = currentPattern.sections.findIndex((s) => {return (s == section) })
      const new_sections = currentPattern.sections.toSpliced(index_of_section, 1).toSpliced(index_of_section, 0, new_section)
      // Re-rendering the current pattern
      const new_pattern = {title: currentPattern.title, author: currentPattern.author, image: currentPattern.image, difficulty: currentPattern.difficulty, sections: new_sections}
      setCurrentPattern(new_pattern)
    }
}
export default App
