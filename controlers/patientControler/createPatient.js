import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import Prisma from "../../prisma.js";
import { sanitizeData } from "../userControler/createAccount.js";
import { patientSchema } from "../../validationSchema/patient.schema.js";



const createPatient = asyncHandler(async(req, res) => {

// validate inputs 
const {error} = patientSchema.validate(req.body)
if(error) throw new CustomError(error.message  , error.code || 401 , error.stack || "line 13 createpatient controler")
 // senitize incoming inputs 
 const senitizedData = sanitizeData(req.body)

 // check user role and its existance 
 await checkUserAndRole(senitizedData.userId ,"PATIENT");

// add user in db 
const Patient = await addPatientInDb(senitizedData)

// send responce 
 res.status(201).json({
    success : true , 
    data : Patient
 })

})



const checkUserAndRole = async(userId , role) => {

  const checkUserRole = await Prisma.user.findUnique({
    where : {
        id : userId ,
        role : role
    }
})

if(!checkUserRole) throw new CustomError("user or its role is not found as desired" , 401 , "line 34 createPatient controler")

return checkUserRole

}

const addPatientInDb = async(data ) => {

    const respoceFromDb = await Prisma.patient.create({
        data :  data
     })

     if(!respoceFromDb) throw CustomError("failed to insert dat into db" , 410 , "line 51 patient controler")

     return  respoceFromDb
}


export {
    createPatient, 
    checkUserAndRole

}