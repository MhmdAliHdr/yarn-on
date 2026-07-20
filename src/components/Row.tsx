import type { Row_Type } from "../types/row.ts"

function Row(row: Row_Type){
    return <div className="text-2xl">Row {row.row_number}: {" "}
    {/* If a row is unfinished, it is rendered as an input box allowing the user to fill it with the corresponding stitches */}
        {!row.finished ? <><input className="border-2 border-black-500 rounded-full text-center mt-2" type="text" id="latest_row"></input>
        <input className="border-2 border-black-500 rounded-full text-center mt-2" id="final_stitch_count" placeholder="Final Stitch Count"></input>
        <input type="number" className="border-2 border-black-500 rounded-full text-center mt-2" id="row_image_input" placeholder="Image URL (optional)"></input></> : 
        <>
        {/* If a row is finished, its stitches and image if added are rendered */}
        {row.stitches?.toString() + "  [" + row.final_stitch_count + "]"}
        {!(row.img != undefined) ? <img className="w-90 h-90 ml-auto mr-auto" src={row.img}></img> : <div></div>}
        </>
        }
    </div>
}
export default Row