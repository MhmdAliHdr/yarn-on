import { useState } from 'react'
import { usePDF } from "react-to-pdf"
import './App.css'
import Section from "./components/Section"
import type { Pattern } from './types/pattern'
import logo from "./assets/logo_transparent.png"
import { changePattern, changeTitle, changeAuthor, changeDifficulty, changeImage, savePattern } from './utils/pattern'
import { addSection, removeSection } from './utils/section'



function App() {
  // File is saved as pattern.pdf
  const { toPDF, targetRef } = usePDF({filename: "pattern.pdf"})
  // The app keeps track of one state, the current pattern which refers to currently selected and worked on pattern by the user
  const [ currentPattern, setCurrentPattern ] = useState<Pattern>({title: "New Pattern", author: "No Author", image: "No Image", difficulty: "Easy", sections: []})
  const [ newSectionName, setNewSectionName ] = useState<string>("")
  // If the localStorage key for saved patterns has not been defined yet, define one with an empty list
  if(JSON.parse(localStorage.getItem("savedPatterns") ?? "[]") == null){
    const savedPatterns: Pattern[] = []
    localStorage.setItem("savedPatterns", JSON.stringify(savedPatterns))
  }
  // The main app component
  return (
    <div className="grid grid-cols-1 gap-4 bg-[#F3F3F1] mr-auto ml-auto text-center mt-20 mb-20 shadow-lg shadow-black w-full max-w-280 mx-auto px-4 py-0">
      <img src={logo} className="w-160 mr-auto ml-auto pt-10 pb-10"></img>
      {/*The following select tag allows the user to pick between their saved patterns*/}
      <div className="mt-10 mb-1 mr-auto ml-auto w-80 border-2 border-black-500 rounded-3xl shadow-md shadow-black">
      <h2 className="mt-5 text-3xl">Current Pattern:</h2>
        <select className="border-2 border-black-500 rounded-full text-center mt-2 transition-transform duration-300 focus:scale-110 focus:outline-none" id="selected_pattern" onChange={(e) => { setCurrentPattern(changePattern(e.target.value))}}>
        <option key="New Pattern">New Pattern</option>
        {JSON.parse(localStorage.getItem("savedPatterns") ?? "[]")?.map((pattern: Pattern) =>
          <option key={pattern.title}>{pattern.title}</option>
        )}
      </select>
      {/* Input boxes and buttons to change the pattern name and authors as well as a dropdown menu to select the difficulty*/}
      <><div></div><input className="border-2 border-black-500 rounded-full text-center mt-5 transition-transform duration-300 focus:scale-110 focus:outline-none " onChange={(e) => {setCurrentPattern(changeTitle(e.target.value, currentPattern))}} type="text" id="pattern_name" placeholder="Title"></input><div></div>
      <input className="border-2 border-black-500 rounded-full text-center mt-5 transition-transform duration-300 focus:scale-110 focus:outline-none" onChange={(e) => {setCurrentPattern(changeAuthor(e.target.value, currentPattern))}} type="text" id="pattern_author" placeholder="Author"></input><div></div></>
      <select className="border-2 border-black-500 rounded-full text-center mt-2 transition-transform duration-300 focus:scale-110 focus:outline-none" id="pattern_difficulty" onChange={(e) => {setCurrentPattern(changeDifficulty(e.target.value, currentPattern))}}>
        <option value="Easy">Easy</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Difficult">Difficult</option>
      </select>
      <div></div>
      {/* Pattern URL, Images cannot be directly uploaded, but they can be uploaded to a cloud service and linked here */}
      <input className="border-2 border-black-500 rounded-full text-center mt-2 mb-20 transition-transform duration-300 focus:scale-110 focus:outline-none" type="text" id="pattern_image" placeholder="Image URL" onChange={(e) => {setCurrentPattern(changeImage(e.target.value, currentPattern))}}></input>
      </div>
      {/* The following div is what gets exported as a PDF, everything before it is not included (the input components) */}
      <div ref={targetRef}>
      {/* Pattern details */}
      <h2 className="mt-5 text-5xl" id="title">{currentPattern.title}</h2>
      <h2 className="mt-5 text-3xl" id="author">By {currentPattern.author}</h2>
      <h2 className="mt-5 text-3xl" id="difficulty">Level: {currentPattern.difficulty}</h2>
      {!(currentPattern.image != undefined) ? <img className="ml-auto mr-auto w-160 h-160 mt-8" id="pattern_image_tag" src={currentPattern.image}></img> : <div></div>}
      {/* Each section of the pattern is represented by a Section component*/}
      {currentPattern.sections.map(section =>
        <>
        {/* A section component takes a name and rows as props */}
        <Section key={section.name} section={section} currentPattern={currentPattern} onChange={setCurrentPattern}/>
        </>
      )}
      </div>
      {/* Buttons to allow adding and removing sections */}
      <div className="mt-20 mr-auto ml-auto w-80 border-2 border-black-500 rounded-3xl shadow-md shadow-black">
      <h2 className="text-3xl">Manage Sections</h2>
      <input className="border-2 border-black-500 rounded-full text-center mt-2 transition-transform duration-300 focus:scale-110 focus:outline-none" placeholder="New Section Name"type="text" id="new_section_name" onChange={(e) => {setNewSectionName(e.target.value)}}></input><div></div>
      <input className="transition-transform duration-300 hover:scale-110 border-2 border-black-500 rounded-full text-center mr-10 mt-2 text-3xl w-18 h-18 rounded-full" type="button" value="+" onClick={() => setCurrentPattern(addSection(newSectionName, currentPattern))}></input>
      <input className="transition-transform duration-300 hover:scale-110 border-2 border-black-500 rounded-full text-center mt-2 text-3xl w-18 h-18 rounded-full mb-5" type="button" value="-" onClick={() => setCurrentPattern(removeSection(currentPattern))}></input><div></div>
      {/* Calls the toPDF function from the react-to-pdf package to export the div as a PDF */}
      <button className="transition-transform duration-300 hover:scale-110 border-2 border-black-500 rounded-full text-center mt-2 text-2xl w-18 h-13 rounded-full mb-5" onClick={() => savePattern(currentPattern)}>Save</button><div></div>
      <button className="transition-transform duration-300 hover:scale-110 border-2 border-black-500 rounded-full text-center mt-2 text-2xl w-50 h-13 rounded-full mb-4" onClick={() => toPDF()}>Export to PDF</button>
      </div>
      <div className="mb-13"></div>
    </div>
  )
}
export default App
