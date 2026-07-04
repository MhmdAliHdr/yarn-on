import Row from "./Row"
import type { Section_Type } from "../types/section"

function Section(section: Section_Type){
    return <div>{section.name}
            {section.rows.map(row =>
                <Row row_number={row.row_number} stitches={["sc", "sc"]} finished={false}/>
            )}
           </div>
}
export default Section