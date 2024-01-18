import Prisma from "../prisma.js"




const getPatient = async(patientId) => {

   
   const patient = await Prisma.patient.findUnique({
       where : {id : parseInt(patientId)}
   })

   if(!patient) throw new CustomError("patient not found " , 401 , "line 20 getonepatient")

    
   return patient

}

export {
    getPatient
}