import Row from "./Row"
import type { SectionProps } from "../types/sectionProps"

function Section({currentPattern, section, onChange}: SectionProps){
    // The Section component visualizes the name of the section followed by its Rows
    return <div key={section.name} ><h2 className="text-5xl">{section.name}</h2>
            {section.rows.map(row =>
            /* A row component takes a row number, input, stitches, whether the row is finished or not, an optional image, and the final stitch count as props*/
                <Row key={row?.row_number} row={row} currentPattern={currentPattern} onChange={onChange}/>
            )}
           </div>
}
export default Section