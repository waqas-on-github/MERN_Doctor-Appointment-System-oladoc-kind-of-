import CustomError from "../../utils/CustomError.js";
import Prisma from "../../prisma.js";
import { allDoctorsTimestempsArray } from "./updateTimestemps.js";


// we are generating timestemps of timeslot from new day to next 30 days 
const createMultimpeTimeStempsByAppCall = async () => {
  
  // get all doctors ids 
  const doctorIds = await getDoctorIds()
 //get  doctor ids  they dont have secduled their timeStemps 
  const doctorIdsWithoutTimeslot = await doctorIdsWithoutTimeslots(doctorIds)
 //slots Ids  of those doctor who dont have timestems and intended to create timestemps  
   const slotsToCreateTimeStemps = await doctorsSlots(doctorIdsWithoutTimeslot)
   // all doctorTimeStempsArray will get all doctors timeslots and convert them in to timeslots accordengly
   // and return them they are nested array im just flatting them inyo one arr down there  
   const allDocTimestemps = [].concat(...allDoctorsTimestempsArray(slotsToCreateTimeStemps));

  if(allDocTimestemps!==0) {
    try {
        // inserting all created timsetmps into db        
        var timeStempsTableResponce = await insertTimeStempsInDb(allDocTimestemps)

    } catch (error) {
        throw new CustomError(error.message , error.code , error.stack )
    }

  }
    
    return timeStempsTableResponce
};


// insering all recods into db 
const insertTimeStempsInDb = async (timeStemps) => {
      return await Promise.all (timeStemps.map(async (oneTimeStemp) => {
           return  await Prisma.slotTimestemps.create({ data: oneTimeStemp });

   }))

   }


// get all doctors and return their ids 
const getDoctorIds = async () => {

try {
    var doctors = await Prisma.doctor.findMany();
  } catch (error) {
    throw new CustomError(error.message, error.code, error.stack);
  }

  const doctorIds = doctors.map((doctor) => {
    return doctor.id;
  });
return doctorIds
}

// job of this function is to check is ther some doctor they dont have secduled their timeStemps 
const doctorIdsWithoutTimeslots = async (doctorIds) =>{
    // here i need to do more filters like checking day how may days of timestemps are available 
return await Promise.all(
    doctorIds?.map(async (doctorId) => {
      try {
        const existingEntry = await Prisma.slotTimestemps.findUnique({
          where: { doctorId: doctorId },
        });

        if (!existingEntry) {
          return doctorId;
        }

        return null;
      } catch (error) {
        return error;
      }
    })
  );
}



//slots of those doctor who dont have timestems and intended to create timestemps  
const doctorsSlots = async (doctorIdsWithoutTimeslots) =>{
   return await  Promise.all(
    doctorIdsWithoutTimeslots
      .filter((doctorId) => doctorId !== null) // filtring array so be sure do dont have nulls 
      .map(async (doctorId) => {                // mapping over filterd array and finding doctor time slots
        return await Prisma.timeSlot.findUnique({
          where: { doctorId: doctorId},
        });
      })
  );
    }

export { createMultimpeTimeStempsByAppCall };



// logics disscussion 
 /*

  get next 30 days of doctor by 
  ----> if we are creating new doctor/thats registerd right now by createdAt date + 30 days okey
  ---->  if we are updating doctors time steps like secduled after each 24 hours what we need to do 
         ---> updated whic are booked: true or startDate : null or endDate : null 
         ---> check for total days if days are less then 30 create remaning days timestemps 
         ---> we can accomplish this in different ways 
         #1 checking total days if they are not 30 then check last daye or greated date 
         and complete 30 of them 




 */