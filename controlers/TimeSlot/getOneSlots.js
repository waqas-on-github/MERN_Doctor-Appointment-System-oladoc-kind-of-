import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import Prisma from "../../prisma.js";

import { validateById } from "../doctorControler/getOneDoctor.js";


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



const getSlot = async (slotId , doctorId) => {
  // cause no internet right now to see prisma OR statemanet wotk with findeunique 
   // so ill use if for now 

   var slot ;
   
   if(slotId){
       slot = await Prisma.timeSlot.findUnique({
          where : {id :  parseInt(slotId) }
      })
   }

   if(doctorId) {
    slot = await Prisma.timeSlot.findUnique({
        where : {doctorId :  parseInt(doctorId) }
    })
}
    
    
    if(!slot)  throw new CustomError("not slot found" , 401 , "line 18 getoneslot")

    return slot 
}

export {
    getOneSlot, 
    getSlot
}