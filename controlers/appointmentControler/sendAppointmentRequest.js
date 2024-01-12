import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import Prisma from "../../prisma.js";
import { appointmentRequestSchema } from "../../validationSchema/appointment.schema.js";
import { sanitizeData } from "../userControler/createAccount.js";
import { getDoctor } from "../../helpers/getDoctor.js"
import { getOnePatientById } from "./getAppointmentInfo.js";

/*
...................APPLICATION LOGIC SENARIOS............

...REQUIREMENTS TO SEND APPIONTMENT REQUEST 
 ... patientId 
 ... doctorId
 ... timeStemps you wanna book for  --> date can  be extrected from timeStemps if needed   

...............IMPLEMENTATION LOGIC..............
 after sendig apointment  request some actions we need do 

  in slotstemps Table set record  "requsetedTobook : true" so other user can not reaplly which timestemp is 
  already likned/intented to booked by some user/patient
  set patientid alos which patient is requesting to book this


 """"""""if doctor accept appointment request from patient"""""

    --->set "doseDoctorAccepted" :true in crosponding appointment row 
    ---> set "status":"SECDULED"  in crosponding appointment row

     ---> get timespempes by timstempId provided by patient  wichih blongs to this doctor and provided/desired by patient 
     -->  then set booked : true , get startTime and endTime  
          and create new record in appointmentSlot and privide 
          start and end time  to create record 
          if---> insertion get successfull  you can set them into null value or leave as it is 

    """"""""""""""""""""""""""if doctor reject  just return responce of rejection 


 if doctor fullfill appointement 
      ---> update  that timestemps to null  from "slotTimestemps" table 

 if doctor canceled  appointement 
    -->delete time related data  insertd in "appointmentSlot" and set back that data in "slotTimestemps"


.........................NOTIFICATION SENARIOS ....................

when appointment requested by user succeed. doctor will get email
then if  appointment will be accepted"SCHEDULED"  by doctor patient should alos get email notification
     ---> if canceled then patient should also be notified/emailed or get sms/whatsapp sms 

-->doctor sould get email when more then 3 appointment requested   
*/

const sendAppointmentRequets = asyncHandler(async (req, res) => {
  /// validate inputs
  const { error } = appointmentRequestSchema.validate(req.body);
  if (error) throw new CustomError(error.message, error.code, error.stack);

  // console.log(req.body);

  /// senitize inputs
  const sanitizedData = sanitizeData(req.body);

  //check  timestemp exists and not requested to booked by some other patient 
  const doseTimeStempsExists = await getOneTimeStemp({
    id: parseInt(sanitizedData.timeStempsId),
    requestedToBook: false,
    patientId : null

  });

  if (!doseTimeStempsExists)
    throw new CustomError(
      "this timestemp not found or already booked by some one else ",
      401,
      "line 72 sendAppointetrequest"
    );

  /*
       in slotstemps Table set record  "requsetedTobook : true" so other user can not reaplly which timestemp is 
       already likned/intented to booked by some user/patient
     */

  const timeStempUpdaetResult = await updaetTimeStemps(
    parseInt(sanitizedData.timeStempsId),
    { requestedToBook: true, patientId: parseInt(sanitizedData.patientId) }
  );
  if (!timeStempUpdaetResult)
    throw new CustomError(
      "failed to send appointment request",
      401,
      "line 80 sedappointrequest"
    );
  // TODO send email/sms to doctor /clinic admin  for appointment request by some patient 

  // send responce back

  res.status(201).json({
    success: true,
    message: "appoint requested",
    timeStemp: timeStempUpdaetResult,
  });
});

const updaetTimeStemps = async (timeStempId, data) => {
  try {
    var dbResp = await Prisma.slotTimestemps.update({
      where: { id: timeStempId },
      data: { ...data },
    });
  } catch (error) {
    return error;
  }
  return dbResp;
};

// just get one timestemp by reqesting to db
const getOneTimeStemp = async (options) => {
  try {
    var dbResp = await Prisma.slotTimestemps.findUnique({
      where: { ...options },
    });
  } catch (error) {
    return error;
  }
  return dbResp;
};

export { sendAppointmentRequets, getOneTimeStemp, updaetTimeStemps };
