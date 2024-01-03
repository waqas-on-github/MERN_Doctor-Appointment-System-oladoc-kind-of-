import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import Prisma from "../../prisma.js";
import { checkTimeSlotAvilibility } from "../appointmentControler/createAppoinment.js";



const seedTimestemps = asyncHandler( async (req, res ) => {

    // get all doctors 
const allDoctors =  await Prisma.doctor.findMany() 
const allSlots  = await Prisma.timeSlot.findMany()
// wanna find each doctor time slots 


const  getNumberOfAvailableSlots = allSlots.map( (slot) => {
  console.log(slot);
    // i wanna calculate each doctor available slots 
     const result = checkTimeSlotAvilibility(slot.startTime , slot.endTime , slot.appointmentDuration)

     
     
})




// what i want 

/*  
start time 

5:00 -> dutarion 20 min  -> total available time -> 240 min  -> end time 9:00


slot 1 -> 5:00: 5:20 
slot 2 -> 5:00: 5:20 
slot 3 -> 5:00: 5:20 
slot 4 -> 5:00: 5:20 


untill met end time 




/*



1 divid toataltime into timestamps 
2 we can convert these timestamps actual timepices 
3 each piece shold be uniuqely identified row in a table along other properties like booked or not and id 
4 then cron job should run and set all this stuff for every doctrot every  day 
5 we need to first get all doctors  
6 then run process of get all of their time calculations 
7 and then put all of them into tables 
*/

} )






export {
    seedTimestemps
}


























