import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import Prisma from "../../prisma.js";
import { calculateNumberOfAvailableSlots } from "../appointmentControler/getAppointmentInfo.js";

/*
1 divid toataltime into timestamps 
2 we can convert these timestamps actual timepices 
3 each piece shold be uniuqely identified row in a table along other properties  like doctorId , slotId id 
4 then cron job should run and set all this stuff for every doctor every  day 
5 we need to first get all doctors  
6 then run process of get all of their time calculations 
*/


// do  slots secduling every day
const seedTimestemps = asyncHandler(async (req = null, res = null) => {

  // get all time slots that exist on our platform 
  const allSlots = await Prisma.timeSlot.findMany();
  // get all timestemps that exist on our platform
  const timeStempsByDb = await Prisma.slotTimestemps.findMany();


  // if no slot found for some reson 
  if (!allSlots)
    throw new CustomError(
      "no slots found ",
      400,
      "seedstemps secduler line 25 "
    );

  // sending all timeslots data to timestempsgenerator funcation that generate time stemps for us 
  // destrcturong outputs on the fly
  const allDocTimestemps = [].concat(...allDoctorsTimestempsArray(allSlots));


  // i wanna compare all items of allDocTimestemps with allDocTimestemps
   const updatedTimeStemps = await updateTimeStemps(
     timeStempsByDb,
     allDocTimestemps
   );

    if (res !== null) {

     if (updatedTimeStemps) {
       return res.send(updatedTimeStemps);
     }
   }

   console.log(updatedTimeStemps);
});




// take db timestemps and check and update them  
const updateTimeStemps = async (timeStempsByDb, allDocTimestemps) => {
  
  // maping over array of timestemps which we got from db 
  const allTimeStempsResponce = await Promise.all(timeStempsByDb.map(async (oneTimeStempByDb) => {

      const oneTimeStempResponce = await Promise.all(allDocTimestemps.map(async (oneTimeStempByME) => {


          try {
            const dbResponce = await Prisma.slotTimestemps.update({
              where: { id: oneTimeStempByDb.id },
              data: oneTimeStempByME,
            });
            return dbResponce;
          } catch (error) {
            return error;
          }
        })
      );
      return oneTimeStempResponce.flat();
    })
  );

  return allTimeStempsResponce.flat();
};
//TODO this funcation have logical errors it'll reimplemented soon
// convret  One  doctors   duration in to timestemps
const returnTimeStemps = (slot) => {

  let numberOfSlots = calculateNumberOfAvailableSlots(
    slot.startTime,
    slot.endTime,
    slot.appointmentDuration
  );
 console.log(numberOfSlots);
  const timeStamps = [];

  // Iterate over the slots and calculate timestamps
  for (let i = 0; i < numberOfSlots; i++) {
    const slotStartTime = new Date(
      slot.startTime.getTime() + i * slot.appointmentDuration * 60 * 1000
    );
    const slotEndTime = new Date(
      slotStartTime.getTime() + slot.appointmentDuration * 60 * 1000
    );

    // Convert to ISO 8601 format and push to the array
    timeStamps.push({
      startTime: slotStartTime.toISOString(),
      endTime: slotEndTime.toISOString(),
      doctorId: slot.doctorId,
      slotId :  slot.id,
      updatedAt : new Date(), 
      booked : false 
    });
  }

  return timeStamps;
};

// map on each doctor  and convert their generate timestemps arrays
const allDoctorsTimestempsArray = (allSlots) => {
  const result = allSlots.map((slot) => {
    return returnTimeStemps(slot);
  });

  return result;
};

export { seedTimestemps , returnTimeStemps , allDoctorsTimestempsArray };