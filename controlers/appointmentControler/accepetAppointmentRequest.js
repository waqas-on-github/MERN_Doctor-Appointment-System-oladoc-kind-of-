import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import Prisma from "../../prisma.js";
import { appointmentRequestSchema } from "../../validationSchema/appointment.schema.js";
import { sanitizeData } from "../userControler/createAccount.js";
import { getOneTimeStemp } from "./sendAppointmentRequest.js";
import { updaetTimeStemps } from "./sendAppointmentRequest.js";
import {appointementStatusConstents }from '../../utils/constents.js'
import { getDoctor } from "../../helpers/getDoctor.js";
import { getPatient } from "../../helpers/getPatient.js";
import { getOneUser } from "../userControler/getProfile.js";
import { mailHelper } from "../../services/mailHelper.js";

/*
...REQUIREMENTS TO SEND APPIONTMENT REQUEST 
 ... patientId 
 ... doctorId
 ... timeStemps you wanna book for  --> date can  be extrected from timeStemps if needed  


 """"""""if doctor/admin click to  accept appointment request from patient"""""

    --->set "doseDoctorAccepted" :true in crosponding appointment row 
    ---> set "status":"SECDULED"  in crosponding appointment row
    --->check patientid is same patient who requested 

     ---> get timespempes by timstempId provided by patient  wichih blongs to this doctor and provided/desired by patient 
     -->  then set booked : true , get startTime and endTime  
          and create new record in appointmentSlot and privide 
          start and end time  to create record 
          if---> insertion get successfull  you can set them into null value or leave as it is 

 */
const acceptAppointmentRequest = asyncHandler(async (req, res) => {
  /// validate inputs
  const { error } = appointmentRequestSchema.validate(req.body);
  if (error) throw new CustomError(error.message, error.code, error.stack);

  /// senitize inputs
  const sanitizedData = sanitizeData(req.body);
 // check doctor extance in db 
  await getDoctor(sanitizedData.doctorId)
  //check  timeslot existance  and it should be booked by same patient
  const doseTimeStempsExists = await getOneTimeStemp({
    id: parseInt(sanitizedData.timeStempsId),
    requestedToBook: true,
    patientId: parseInt(sanitizedData.patientId),
  });

  // check  is this timestemp alredy booked by some other patient

  if (!doseTimeStempsExists)
    throw new CustomError(
      "this timestemp not found or booke by soem other patient already",
      401,
      "line 72 acceptappointRequest"
    );

  // update field  booked: true
  const timeStempUpdaetResult = await updaetTimeStemps(
    parseInt(sanitizedData.timeStempsId),
    { booked: true }
  );
  if (!timeStempUpdaetResult)
    throw new CustomError(
      "failed to accept appointment request",
      401,
      "line 80 acceptppointrequest"
    );

    console.log(timeStempUpdaetResult);

  // after setting timesstemp to booked we need to copy its start time and end time and crete new
  
    const dbResponce = await addAppointmentRecordInDb({

     doctorId             : sanitizedData.doctorId,
     patientId            : sanitizedData.patientId,
     doseDoctorAccepted   : true,
     statusByDoctor       : appointementStatusConstents.SCHEDULED,  
     checkinTime          : timeStempUpdaetResult.startTime,
     checkoutTime         : timeStempUpdaetResult.endTime 
     
    })

   
     if(!dbResponce) throw new CustomError("failed to create insert appoint record in db" , 401 , "line 80 accepetappointment controler")
  

    // get patient email address and send it to user 

    const patient = await  getPatient(sanitizedData.patientId) 
    const user =    await     getOneUser(parseInt(patient.userId))

    //TODO send email /sms to patient about that his appointment is secudeled for this doctor 

    await sendAppointmentAcceptEmail(user.email)


     res.status(201).json({
      success : true , 
      appointment : dbResponce
     })


});



const isTimeSlotBookedAlreadyBySomePatient = async (filters) => {
  let isBooked;
  try {
    isAvailable = Prisma.slotTimestemps.findUnique({
      where: { ...filters },
    });
  } catch (error) {
    throw new CustomError(error.message, error.code, error.stack);
  }

  return isBooked;
};


const addAppointmentRecordInDb = async(data) => {

     let dbResponce ;
     try {
         dbResponce = Prisma.appointment.create({data: {...data}})

     } catch (error) {
         throw new CustomError(error.message , error.code , error.stack )
     }

     return dbResponce
}




const sendAppointmentAcceptEmail = async (patientEmail) => {

  //TODO will be more strucured and detailed later
  
   const message = `your appointment request with doctor is accepted`
 
   try {
     var mailResponce = await mailHelper({
       email: patientEmail,
       subject: "Appointment  Request acceptance ",
       text: message
     })
   } 
   
   catch (error) {
     throw new CustomError(error || "Email could not be sent", 500, error.stack)
   }
 
   return mailResponce
 
 }
 


export { 
     acceptAppointmentRequest,
     isTimeSlotBookedAlreadyBySomePatient };
