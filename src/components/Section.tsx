import Row from "./Row"
import type { Section_Type } from "../types/section"

function Section(section: Section_Type){
    // The Section component visualizes the name of the section followed by its Rows
    return <div key={section.name} ><h2>{section.name}</h2>
            {section.rows.map(row =>
                <Row key={row.row_number} row_number={section.rows.findIndex((r) => { return (r == row)})} input="" stitches={row.stitches} finished={row.finished} final_stitch_count={row.final_stitch_count}/>
            )}
           </div>
}
export default Section