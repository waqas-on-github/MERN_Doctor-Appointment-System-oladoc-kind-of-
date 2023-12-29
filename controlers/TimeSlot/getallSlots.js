import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import Prisma from "../../prisma.js";


const getAllSlots = asyncHandler(async(req, res) => {


const allSlots = await Prisma.timeSlot.findMany()
if(!allSlots) throw new CustomError("no slots found" , 401 , "line 9 getallslots")

res.status(200).json({
    success : true ,
    slots : allSlots
})


  
})




export {
    getAllSlots
}