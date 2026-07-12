import Row from "./Row"
import type { Section_Type } from "../types/section"
import { useState } from "react";
import type { Row_Type } from "../types/row";

function Section(section: Section_Type){
    const [rows, setRows] = useState<Row_Type[]>(section.rows)
    return <div key={section.name} ><h2>{section.name}</h2>
            {rows.map(row =>
                <Row key={row.row_number} row_number={row.row_number} stitches={row.stitches} finished={row.finished} final_stitch_count={row.final_stitch_count}/>
            )}
            <input type="button" value="+" onClick={addRow}></input>
            <input type="button" value="-" onClick={removeRow}></input>
           </div>
    function addRow(){
        const new_empty_row = {row_number: rows.length + 1, stitches: [], input:"", finished: false, final_stitch_count: 0}
        if(rows.length > 0){
            rows[rows.length - 1].finished = true
            rows[rows.length - 1].stitches = document.getElementById("row_" + rows.length.toString()).value
        }
        const new_rows = [...rows, new_empty_row]
        setRows(new_rows)
    }
    function removeRow(){
        const new_rows = rows.slice(0, (rows.length - 1))
        setRows(new_rows)
    }
}
export default Section