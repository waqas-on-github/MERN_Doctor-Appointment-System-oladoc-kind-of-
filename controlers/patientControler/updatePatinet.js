import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import Prisma from "../../prisma.js";
import { validatePatientById } from "./deletePatient.js";
import { sanitizeData } from "../userControler/createAccount.js";



const updatePatient = asyncHandler(async(req, res) => {

// paramaters schema validation
 const id =  validatePatientById(req) 
// senitize data 
const sanitizedData = sanitizeData(req.body)

const updatedPatient = await Prisma.patient.update({
    where : {id: parseInt(id)},
    data : sanitizedData
})


if(!updatePatient) throw new CustomError(" patient data can not be updated " , 401 , "line 22 updatepatient")

res.status(201).json({
    success : true , 
    updatedData : updatedPatient
})


})





export{
    updatePatient
}