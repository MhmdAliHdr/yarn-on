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
    {console.log(currentPattern)}
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
        <Section key={section.name} name={section.name} rows={section.rows}/>
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
    const new_empty_section = {name: new_section_name, rows: [{row_number: 1, stitches: ["sc"], input:"", finished: false, final_stitch_count: 0}, ]}
    const newSections = [...currentPattern.sections, new_empty_section]
    const changedPattern = {title: currentPattern.title, author: currentPattern.author, image: currentPattern.image, difficulty: currentPattern.difficulty, sections: newSections}
    setCurrentPattern(changedPattern)
  }
  function removeSection(){
    const newSections = sections.slice(0, (sections.length - 1))
    const changedPattern = {title: currentPattern.title, author: currentPattern.author, image: currentPattern.image, difficulty: currentPattern.difficulty, sections: newSections}
    setCurrentPattern(changedPattern)
  } 
}
export default App
