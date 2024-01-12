import Prisma from "../prisma.js";
const getDoctor = async (doctorId) => {
    
    const doctor = await Prisma.doctor.findUnique({
      where: { id: parseInt(doctorId) },
    });
    if (!doctor)
      throw new CustomError("doctor not found ", 401, "line 9 getonedoctor helper");
  
    return doctor;
  };

  
  export {
    getDoctor
  }