import Prisma from "../prisma.js"


const checkDoctorExistance = async(userId) => {

    const checkExistances = await Prisma.doctor.findUnique({ 
        where : {id:  userId}
    })

    if(!checkExistances) throw new CustomError("doctor dont existes" , 401 ,"line 30 createslot") 

    return checkExistances

}
  

export {
    checkDoctorExistance
}