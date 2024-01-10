import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import Prisma from "../../prisma.js";
import { appointmentSchema } from "../../validationSchema/appointment.schema.js";
import { sanitizeData } from "../userControler/createAccount.js";
import { getSlot } from "../TimeSlot/getOneSlots.js";
import { getDoctor } from "../doctorControler/getOneDoctor.js";
import { differenceInMinutes } from "date-fns";





const getAppointmentDetails = asyncHandler(async (req, res) => {

  // validate inputs
  const { error } = appointmentSchema.validate(req.body);
  if (error)
    throw new CustomError(error.message, error.code || 401, error.stack);

  // senatize data
  const sanitizedData = sanitizeData(req.body);

  // check doctor availability  for that day
  // check  doctor appoinment capacity for that day/date
  // check doctor is avaliable like that day
  //-->all of above checked in  " checkDoctorAndSlotAvilibility" funcation
  const checkDoctorAndSlotsAvailable = await checkDoctorAndSlotAvilibility(
    sanitizedData.doctorId
  );

  // check patient existence is patient exists in db or not
  // all exceptions and error handling done in funcation already
  await getOnePatientById(sanitizedData.patientId);
  
  // thrwoing error if doctor is not available
  if (!checkDoctorAndSlotsAvailable || checkDoctorAndSlotsAvailable <= 0)
    throw new CustomError(
      "this doctor is not available ",
      401,
      "line 28 createAppiontment crtl"
    );
  //check about doctor timeslots are time slots available and not booked yet
  const getTimeStemps = await getDoctorTimeStemps(sanitizedData.doctorId);
  // all above will be done after crud implementation
  res.json({
       success: true ,
       totalTimeStemps :  getTimeStemps.length,
       timeStempinfo : getTimeStemps
       
  });

});

// check doctor availability  for that day
// check  doctor appoinment capacity for that day/date
// check doctor is avaliable like that day
const checkDoctorAndSlotAvilibility = async (doctorId) => {
  //  check doctor exists
  await getDoctor(parseInt(doctorId));
  // get doctor accocated slot information by doctord
  const slot = await getSlot(null, parseInt(doctorId));
  // check is today doctor available
  const isDoctotTodayAvailable = isDoctotAvailableToday(slot?.availabilitydays);
  // console.log(isDoctotTodayAvailable);

  if (!isDoctotTodayAvailable)

     throw new CustomError( `today doctor is not available`,401,"line 50 appioment ctrl");

  if (isDoctotTodayAvailable) {
    // if doctor is available  then check number of available slot for this doctor
    var totalSlots = calculateNumberOfAvailableSlots(
      slot.startTime,
      slot.endTime,
      slot.appointmentDuration
    );
  }

  return totalSlots;
};

// checking doctor is available today at that day
const isDoctotAvailableToday = (availabilitydays) => {
  // get current day number of the week like sunday --> 0 monday-->1 and so on
  // note keep in mind day numbers also start like array indexes like 0,1,2,3,....

  const dayNumber = new Date().getDay()

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // so that pitcular day comes at which index like day number 0 -->[0-->("monday")]
  const dayName = dayNames[dayNumber];
  // console.log(dayName);
  return availabilitydays.includes(dayName);
};

// calculate total number of slots of doctor
const calculateNumberOfAvailableSlots = (
  startTime,
  endTime,
  appointmentDuration
) => {
   
  // calculate total minuts from start time and end time
  const difference = Math.ceil(differenceInMinutes(endTime, startTime));
  // calculate number of slots with dividing with total minuts
  const numberOfAvailableSots = Math.ceil(difference / appointmentDuration);
  // console.log(numberOfAvailableSots);
  return numberOfAvailableSots;
};

// get doctor timestemps that are not booked and are availble to book
const getDoctorTimeStemps = async (doctorId) => {
  const slot = await getSlot(null, parseInt(doctorId));

  const availableTimestemps = await Prisma.slotTimestemps.findMany({
    where: {
      AND: [  
        { doctorId: doctorId },
        { slotId: slot.id },
         { booked: false },
          {
            startTime: {
              gte:  new Date().toISOString()

            },
          },
      ],
    },
  });

  return availableTimestemps;
};

// checking patient existance
const getOnePatientById = async (patientId) => {

  const onePatient = await Prisma.patient.findUnique({
    where: {
      id: patientId,
    },
  });
  if (!onePatient)
    throw new CustomError(
      "patient not found/ patient need to create account",
      401,
      "line 137 createAppointment crtl"
    );

  return onePatient;
};

export {
  getAppointmentDetails,
  checkDoctorAndSlotAvilibility,
  calculateNumberOfAvailableSlots,
  getDoctorTimeStemps,
  getOnePatientById,
};
