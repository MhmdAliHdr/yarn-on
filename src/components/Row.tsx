import type { Row_Type } from "../types/row.ts"

function Row(row: Row_Type){
    return <div>Row {row.row_number}: 
        {!row.finished ? <input type="text"></input> : 
        row.stitches.map((stitch) => {
            return <div>
                {stitch},
                </div>
        })
        }
    </div>
}
export default Row