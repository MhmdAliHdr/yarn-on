import type { Row_Type } from "../types/row.ts"

function Row(row: Row_Type){
    return <div>Row {row.row_number}: {" "}
        {!row.finished ? <input type="text" id="latest_row"></input> : 
        <>
        {row.stitches.toString()}
        </>
        }
    </div>
}
export default Row