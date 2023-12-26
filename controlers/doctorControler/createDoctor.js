import Prisma from '../../prisma.js'
import asyncHandler from '../../utils/asyncHandler.js'
import CustomError from '../../utils/CustomError.js'
import { createDoctorSchema } from "../../validationSchema/doctor.schema.js"
import {sanitizeData} from "../userControler/createAccount.js"




const createDoctor = asyncHandler(async(req, res ) => {

    // validate inputs 
    //  const {error} = createDoctorSchema.validate(req.body)

    //  if(error) throw new CustomError(error.message  , error.code || 401 , error.stack || "createDoctor line 14")

    // sentize  incoming data  
    // const senitizedData = sanitizeData(req.body)
    // checking user and   user role(is doctor?) or not 
    //  await checkIsUserDoctor(req.body.userId)

     // adding data recod into db 
    const doctorData =  await addDoctorDataInDb(req.body)
    

    res.status(201).json({
       success : true , 
       doctorData : doctorData  
    })


})



const checkIsUserDoctor = async(userId) => {



 const isUserDoctor = await Prisma.user.findUnique({
     where: {
       id: userId,
       role: "DOCTOR"
     }
   });
  
 if(!isUserDoctor) throw new CustomError("user role must be doctor " , 401 , "line 38 createdoctor controler")

 return isUserDoctor

}

const addDoctorDataInDb = async(data) => {

  
const dbResponce = await Prisma.doctor.create({data : data})
  

if(!dbResponce) throw new CustomError("faild to insert record in doctor tabel" , 401 , "line 48 createDoctor controler" )

return dbResponce

}


export {
    createDoctor , checkIsUserDoctor , addDoctorDataInDb
}