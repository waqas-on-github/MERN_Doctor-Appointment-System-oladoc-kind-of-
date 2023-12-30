import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import Prisma from "../../prisma.js";
import { validatePatientById } from "./deletePatient.js";




const getOnePatient = asyncHandler(async(req, res) => {
 
     // validate patient id 
    const id = validatePatientById(req)
    
    const patient = await Prisma.patient.findUnique({
        where : {id : parseInt(id)}
    })

    if(!patient) throw new CustomError("patient not found " , 401 , "line 20 getonepatient")

   res.status(200).json({
    success : true , 
    patient : patient

   })

})



const getOnePatientWithProfile = asyncHandler(async(req, res) => {
 
     const id =validatePatientById(req)
    
    const patient = await Prisma.patient.findUnique({
        where : {id : parseInt(id)},
        include : {user : true}
    })

    if(!patient) throw new CustomError("patient not found " , 401 , "line 20 getonepatient")

   res.status(200).json({
    success : true , 
    patient : patient

   })

})


export {
    getOnePatient, 
    getOnePatientWithProfile
}