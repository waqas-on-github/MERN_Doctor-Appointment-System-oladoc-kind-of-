import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import Prisma from "../../prisma.js";
import { validateById } from "../doctorControler/getOneDoctor.js";


const getOneSlot = asyncHandler(async(req, res) => {

// validate id 
const id = validateById(req)

// get one slot 

const slot = await Prisma.timeSlot.findUnique({
    where : {id :  parseInt(id) }
})

if(!slot)  throw new CustomError("not slot found" , 401 , "line 18 getoneslot")


res.status(200).json({
    success : true , 
    slot : slot
})


})



export {
    getOneSlot
}