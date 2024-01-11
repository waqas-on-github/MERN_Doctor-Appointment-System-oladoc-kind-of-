import CustomError from "../../utils/CustomError.js";
import { returnTimeStemps } from "./updateTimestemps.js";
import Prisma from "../../prisma.js";





const createTimeStempsByAppCall = async(slots)  => {

    
const slotTimestemps = returnTimeStemps(slots)
    // console.log(slotTimestemps);
try {
    var createdTimeStemps= await createNewTimeStemps(slotTimestemps)
    
} catch (error) {
    throw new CustomError(error.message , error.code , error.stack )
}

 
return createdTimeStemps


} 


const createNewTimeStemps = async (timeStemps) => {
    return await Promise.all (timeStemps.map(async (oneTimeStemp) => {
         console.log(oneTimeStemp);
         return  await Prisma.slotTimestemps.create({ data: oneTimeStemp });
 
 }))
 
 }











export {
    createTimeStempsByAppCall, 
}