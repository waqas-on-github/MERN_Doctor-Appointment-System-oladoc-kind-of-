import asyncHandler from '../../utils/asyncHandler.js'
import CustomError from '../../utils/CustomError.js'
import Prisma from '../../prisma.js'
import { appointmentSchema } from '../../validationSchema/appointment.schema.js'
import {sanitizeData} from '../userControler/createAccount.js'
import { getSlot } from '../TimeSlot/getOneSlots.js'
import { getDoctor } from '../doctorControler/getOneDoctor.js'
import { differenceInMinutes } from 'date-fns'


const createAppointment = asyncHandler(async(req, res) => {

    // validate inputs 
    const {error} = appointmentSchema.validate(req.body) 
    if(error) throw new CustomError(error.message , error.code || 401 , error.stack)

    // senatize data 
    const sanitizedData  = sanitizeData(req.body) 

    // todo check appointments within time + next 20 minuts (or doctor avaliable time / 20min) when this user wanna get appointment 

    // check doctor availability  for that day 
    // like  doctor appoinment capacity 
    // check doctor is avaliable like that day like tommorow 11:30pm 
    const resp =   await checkDoctorAndSlotAvilibility (sanitizedData.doctorId)
    // all above will be done after crud implementation 

    
    // const createdAppoinmet = await Prisma.appointment.create({
    //     data : sanitizedData
    // })

    // if(!createdAppoinmet)  throw new CustomError("failed to create appointment " , 401 , "line 29 createappointment")

    // res.status(201).json({
    //     success : true , 
    //     appointment : createdAppoinmet
    // })

})



const checkDoctorAndSlotAvilibility = async (doctorId) => {

   //  check doctor exists  
    await  getDoctor(doctorId)
    // get slot id form doctor id 
    const slot = await getSlot( null , doctorId)
   
    // check is today doctor available 
    const isDoctotTodayAvailable = isDoctotAvailableToday(slot?.availabilitydays)

    if(isDoctotTodayAvailable){

       // if doctor is available  then check number of available slot for this doctor 
       const totalSlots = checkTimeSlotAvilibility(slot.startTime , slot.endTime , slot.appointmentDuration)
        
         

    }
   
    // if slot is availabe check is slot booked already for this time or not 

    // if all above conditions met return true so doctor is available today and have a time 

    return slot 

}


const isDoctotAvailableToday = (availabilitydays) => {

   const dayNumber = new Date().getDay()
   const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'sunday']
   const dayName = dayNames[dayNumber]
   return availabilitydays.includes(dayName)
}



 const checkTimeSlotAvilibility = (startTime , endTime , appointmentDuration) => {

 // calculate total minuts from start time and end time 
  const difference = Math.ceil(differenceInMinutes(endTime, startTime))
 // calculate number of slots with dividing with total minuts 
 const numberOfAvailableSots =  Math.ceil((difference/appointmentDuration))
 console.log(numberOfAvailableSots);
 return numberOfAvailableSots

 }


export{
    createAppointment, 
    checkDoctorAndSlotAvilibility , 
    checkTimeSlotAvilibility
}

/*
lets do some plannigs 
1 we divided time into timestamps 
2 we can converts these timestamps actual timepices 
3 each piece shold be uniuqely identified row in a table along other properties like booked or not and id 
4 then cron job should run and set all this stuff for every doctrot every  day 
5 we need to first get all doctors  
6 then run process of get all of their time calculations 
7 and then put all of them into tables 
*/