import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import Prisma from "../../prisma.js";
import { validateById } from "../../helpers/validateById.js";



/*

................requeirments
---> appointment id 
---> doctorid  

 if doctor canceled  appointement 
    -->delete time related data  insertd in "appointmentSlot" and set back that data in "slotTimestemps"
    --> set 
           booked :false 
           requestedToBook : false
           patientId : null
           in slotTimestemps table 
    ---> set   statusByDoctor     : CANCLED  doseDoctrAccepted : false
    --->set statusBypaient : cancled  
    --->send nofification or rmail to patint about cancelation information 
*/



const cancleAppointmentRequest = asyncHandler(async(req, res) => {



})



export{
    cancleAppointmentRequest
}