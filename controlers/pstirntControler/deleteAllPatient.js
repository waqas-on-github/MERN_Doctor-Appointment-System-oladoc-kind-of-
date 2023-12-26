import Prisma from "../../prisma.js";
import CustomError from "../../utils/CustomError.js";
import asyncHandler from "../../utils/asyncHandler.js";


const deletePatients = asyncHandler(async(req, res) => {

const deleteProfiles = await Prisma.patient.deleteMany()

if(!deleteProfiles) throw   new CustomError("patient can not be  deleted for some reason try again" , 401 , "dletePatient line 8") 

res.status(200).json({ 
    success : true ,
    deleted : deleteProfiles
})

})



export {
    deletePatients
}