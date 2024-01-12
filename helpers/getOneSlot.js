import Prisma from "../prisma.js";



const getSlot = async (slotId , doctorId) => {
  
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
    getSlot
 }