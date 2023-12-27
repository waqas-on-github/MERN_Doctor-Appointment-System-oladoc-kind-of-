import Prisma from '../../prisma.js'
import asyncHandler from '../../utils/asyncHandler.js'
import CustomError from '../../utils/CustomError.js'


const getAllDoctors = asyncHandler(async(req, res) => {

const  allDoctors =  await Prisma.doctor.findMany({}) 

if(!allDoctors) throw new CustomError("doctors data not found" , 401 , "line 9 all doctors" ) 

res.status(200).json({
    success : true , 
    doctors : allDoctors
})



})

export {
    getAllDoctors
}