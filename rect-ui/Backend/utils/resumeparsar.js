import fs from "fs"
import pdf from "pdf-parse"

export const extractresume = async (filepath)=>{
    const databuffer = fs.readFileSync(filepath)
    const data =await pdf(databuffer)
    return data.text;

}
