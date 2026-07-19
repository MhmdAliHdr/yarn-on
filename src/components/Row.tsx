import type { Row_Type } from "../types/row.ts"

function Row(row: Row_Type){
    return <div>Row {row.row_number}: {" "}
    {/* If a row is unfinished, it is rendered as an input box allowing the user to fill it with the corresponding stitches */}
        {!row.finished ? <input type="text" id="latest_row"></input> : 
        <>
        {/* If a row is finished, its stitches are rendered */}
        {row.stitches.toString()}
        </>
        }
    </div>
}
export default Row