import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import Prisma from "../../prisma.js";
import { slotSchema } from "../../validationSchema/slot.Schema.js";
import { sanitizeData } from "../../helpers/sanitizeData.js";
import {  createTimeStempsByAppCall} from "../slotTimestempsControlers/createTimestemps.js";
import {checkDoctorExistance } from  "../../helpers/checkDoctorExistance.js"



const createSlot = asyncHandler(async(req, res) => {
//  console.log(req.body);
//  const formattedTime24 = format(new Date(), 'yyyy-MM-ddTHH:mm:ssZ');
//  console.log(formattedTime24);

    // validate inputs 
    const {error} = slotSchema.validate(req.body)
    if(error) throw new CustomError(error.message , error.code || 401 , error.stack)

    // sanitize  data 
     const sanitizedData = sanitizeData(req.body)
   
     // check doctor availability is that doctor exists with this id 
     await checkDoctorExistance(sanitizedData.doctorId)
   
     // add slots in db 
     const dbResponce = await addSlotInDb(sanitizedData) 
    
       // send newly created slot data to createtimstemp controler 
   if  (dbResponce){
     await createTimeStempsByAppCall(dbResponce)

   }
      
     res.status(201).json({
        success : true , 
        slots : dbResponce, 
     })



})


const addSlotInDb = async(data) => {
    const addSlot = await Prisma.timeSlot.create({data : data })
    if(!addSlot) throw new CustomError("can not add time slot" , 401 , "line 42 slots controler")
    return addSlot
}

export {
    createSlot,
    checkDoctorExistance,
    addSlotInDb
}