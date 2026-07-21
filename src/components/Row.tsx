import type { Row_Type } from "../types/row.ts"
import type { RowProps } from "../types/rowProps.ts"
import { addRow, removeRow, changeRowStitches, changeRowFinalCount, changeRowImage } from "../utils/row.ts"
import { useState } from 'react'

function Row({currentPattern, row, onChange}: RowProps){
    var last_section = currentPattern.sections[currentPattern.sections.length - 1]
    const [ lastRow, setLastRow] = useState<Row_Type | undefined>(last_section.rows[last_section.rows.length - 1])
    return <div className="text-2xl">Row {last_section.rows.findIndex((r) => { return (r ==row) }) + 1}: {" "}
    {/* If a row is unfinished, it is rendered as an input box allowing the user to fill it with the corresponding stitches */}
        {(lastRow == row) ? 
        <>
        <input data-html2canvas-ignore className="border-2 border-black-500 rounded-full text-center mt-2" type="text" id="latest_row" onChange={(e) => {
            const newPattern = changeRowStitches(row, currentPattern, e.target.value)
            const lastSection = newPattern.sections[newPattern.sections.length - 1]
            const lastRow = lastSection.rows[lastSection.rows.length - 1]
            setLastRow(lastRow)
            onChange(newPattern)
        }}></input>
        <input data-html2canvas-ignore type="number" className="border-2 border-black-500 rounded-full text-center mt-2" id="final_stitch_count" placeholder="Final Stitch Count"
        onChange={(e) => {
            const newPattern = changeRowFinalCount(row, currentPattern, parseInt(e.target.value))
            const lastSection = newPattern.sections[newPattern.sections.length - 1]
            const lastRow = lastSection.rows[lastSection.rows.length - 1]
            setLastRow(lastRow)
            onChange(newPattern)
        }}></input>
        <input data-html2canvas-ignore className="border-2 border-black-500 rounded-full text-center mt-2" id="row_image_input" placeholder="Image URL (optional)"
        onChange={(e) => {
            const newPattern = changeRowImage(row, currentPattern, e.target.value)
            const lastSection = newPattern.sections[newPattern.sections.length - 1]
            const lastRow = lastSection.rows[lastSection.rows.length - 1]
            setLastRow(lastRow)
            onChange(newPattern)
        }}
        ></input>
        {/* Buttons to allow adding and removing rows from a section */}
        <input type="button" data-html2canvas-ignore className="transition-transform duration-300 hover:scale-110 mr-5 border-2 border-black-500 rounded-full text-center mt-2 text-2xl w-13 h-13 rounded-full" value="+" onClick={() => { 
            const newPattern = addRow(lastRow, currentPattern)
            onChange(newPattern)
            var last_section = newPattern.sections[newPattern.sections.length - 1]
            setLastRow(last_section.rows[last_section.rows.length - 1])
        }}></input>
        <input type="button" data-html2canvas-ignore className="transition-transform duration-300 hover:scale-110  border-2 border-black-500 rounded-full mt-2 font-bold text-2xl w-13 h-13 rounded-full" value="-" onClick={() => { onChange(removeRow(currentPattern)) }}></input>
        </>: 
        <>
        {/* If a row is finished, its stitches and image if added are rendered */}
        {row?.stitches?.toString() + "  [" + row?.final_stitch_count + "]"}
        {!(row?.img != undefined || row?.img != "") ? <img className="w-90 h-90 ml-auto mr-auto" src={row.img}></img> : <div></div>}
        </>
        }
    </div>
}
export default Row