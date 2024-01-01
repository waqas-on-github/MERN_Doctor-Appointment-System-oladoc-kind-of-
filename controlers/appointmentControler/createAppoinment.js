import asyncHandler from '../../utils/asyncHandler.js'
import CustomError from '../../utils/CustomError.js'
import Prisma from '../../prisma.js'
import { appointmentSchema } from '../../validationSchema/appointment.schema.js'
import {sanitizeData} from '../userControler/createAccount.js'
import { getSlot } from '../TimeSlot/getOneSlots.js'
import { getDoctor } from '../doctorControler/getOneDoctor.js'
import { isWeekend } from 'date-fns'


const createAppoinmet = asyncHandler(async(req, res) => {

    // validate inputs 
    const {error} = appointmentSchema.validate(req.body) 
    if(error) throw new CustomError(error.message , error.code || 401 , error.stack)

    // senatize data 
    const sanitizedData  = sanitizeData(req.body) 

    // todo check appointments within time + next 20 minuts (or doctor avaliable time / 20min) when this user wanna get appointment 

    // check doctor availability  for that day 
    // like  doctor appoinment capacity 
    // check doctor is avaliable like that day like tommorow 11:30pm 
    const resp =   await isDoctorAvailableToday (sanitizedData.doctorId)
    console.log(resp);
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



const isDoctorAvailableToday = async (doctorId) => {

   // getdoctor id 
   const doctor = await  getDoctor(doctorId)
   console.log(doctor);
    // get slot id form doctor id 
    const slot = await getSlot( null , doctorId)
   
    
    // check is today is weekday or not 
    // if now weekday then check number of available slot for this doctor 
    // if slot is availabe check is slot booked already for this time or not 
     // if all above conditions met return true so doctor is available today and have a time 

    return slot 

}

const  isDoctorTimeSlotIsAvailable = async (doctorId) =>{

}



export{
    createAppoinmet, 
    isDoctorAvailableToday , 
    isDoctorTimeSlotIsAvailable, 
}