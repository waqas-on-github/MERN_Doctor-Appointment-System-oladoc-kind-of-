import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import Prisma from "../../prisma.js";
import { validateById } from "../doctorControler/getOneDoctor.js";


const deleteSlot = asyncHandler(async(req, res) => {

 // validate id 
  const id = await validateById(req)

 // delete slot 

 const deleted = await Prisma.timeSlot.delete({
    where : {id :  parseInt(id) }
 })

 if(!deleted) throw new CustomError(`solt can not delete  by this id ${id}` , 401 , "line 18 deletslot")

 res.status(200).json({
    success : true , 
    delete : deleted
 })



})



export {
    deleteSlot
}