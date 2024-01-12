import asyncHandler from "../../utils/asyncHandler.js";
import { validateById } from "../../helpers/validateById.js";
import { getSlot } from "../../helpers/getOneSlot.js";


const getOneSlot = asyncHandler(async(req, res) => {

// validate id 
const id = validateById(req)

// get one slot 

const slot = await getSlot(id)


res.status(200).json({
    success : true , 
    slot : slot
})


})



export {
    getOneSlot
}