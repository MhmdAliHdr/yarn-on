import type { Row_Type } from "../types/row.ts"

function Row(row: Row_Type){
    return <div>Row {row.row_number}: 
        {!row.finished ? <input type="text" id={"row_" + row.row_number.toString()}></input> : 
        <div>
        {row.stitches.toString()}
        </div>
        }
    </div>
}
export default Row