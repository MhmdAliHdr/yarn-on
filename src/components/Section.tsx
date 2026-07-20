import Row from "./Row"
import type { Section_Type } from "../types/section"

function Section(section: Section_Type){
    // The Section component visualizes the name of the section followed by its Rows
    return <div key={section.name} ><h2 className="text-5xl">{section.name}</h2>
            {section.rows.map(row =>
            /* A row component takes a row number, input, stitches, whether the row is finished or not, an optional image, and the final stitch count as props*/
                <Row key={row?.row_number} row_number={section.rows.findIndex((r) => { return (r == row)}) + 1} input="" stitches={row?.stitches} finished={row?.finished} final_stitch_count={row?.final_stitch_count} img={row?.img}/>
            )}
           </div>
}
export default Section