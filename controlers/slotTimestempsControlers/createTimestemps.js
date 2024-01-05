import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import Prisma from "../../prisma.js";
import { checkTimeSlotAvilibility } from "../appointmentControler/createAppoinment.js";

// sudocode
/*
1 divid toataltime into timestamps 
2 we can convert these timestamps actual timepices 
3 each piece shold be uniuqely identified row in a table along other properties like booked or not and id 
4 then cron job should run and set all this stuff for every doctrot every  day 
5 we need to first get all doctors  
6 then run process of get all of their time calculations 
*/

// todo local error moniotring system  send email/sms to admin when any crash happen in application in contxt of cronjob

// do  slots secduling every day
const seedTimestemps = asyncHandler(async (req = null, res = null) => {
  const allSlots = await Prisma.timeSlot.findMany();
  const timeStempsByDb = await Prisma.slotTimestemps.findMany();
  // wanna find each doctor time slots
  if (!allSlots)
    throw new CustomError(
      "no slots found ",
      400,
      "seedstemps secduler line 25 "
    ); // will setup error monitring soon
  // destrcturong outputs on the fly
  const allDocTimestemps = [].concat(...allDoctorsTimestempsArray(allSlots));

  // i wanna compare all items of allDocTimestemps with allDocTimestemps

  if (timeStempsByDb.length === 0) {
    var createdTimeStemps = await createNewTimeStemps(allDocTimestemps)
  }


  const updatedTimeStemps = await updateTimeStemps(timeStempsByDb, allDocTimestemps)
  




if(createdTimeStemps){

  return res.send(createdTimeStemps)
}

if(updatedTimeStemps) {
  return res.send(updatedTimeStemps)
}

});













const createNewTimeStemps = async (timeStemps) => {
   return await Promise.all (timeStemps.map(async (oneTimeStemp) => {
        return  await Prisma.slotTimestemps.create({ data: oneTimeStemp });

}))

}

const updateTimeStemps = async (timeStempsByDb , allDocTimestemps) => {

    const allTimeStempsResponce = await Promise.all( timeStempsByDb.map( async (oneTimeStempByDb) => {
      
   const oneTimeStempResponce = await  Promise.all( allDocTimestemps.map(async (oneTimeStempByME) => {
   
       const dbResponce = await   Prisma.slotTimestemps.update({
         where: { id: oneTimeStempByDb.id },
         data: oneTimeStempByME,
       })
       return  dbResponce
 
     }))
     return oneTimeStempResponce.flat()
    
    }))
   
    return allTimeStempsResponce.flat()
   }
  






// convret  One  doctors   duration in to timestemps
const returnTimeStemps = (slot) => {
  let numberOfSlots = checkTimeSlotAvilibility(
    slot.startTime,
    slot.endTime,
    slot.appointmentDuration
  );

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
      booked: false,
      createdAt: new Date(),
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

export { seedTimestemps };

// await  Prisma.slotTimestemps.findUnique({
//   where : {
//     startTime : timeSlotByMe.startTime,
//     endTime  :   timeSlotByMe.endTime,
//     id: timeSlotFromDb.id
//   }
// })
