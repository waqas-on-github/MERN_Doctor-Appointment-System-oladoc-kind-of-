import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import Prisma from "../../prisma.js";


const allPatients = asyncHandler(async(req, res) => {

  const getAllPatients = await Prisma.patient.findMany({

  })

  if(!getAllPatients) throw new CustomError("patients not found" , 401 , "line 10 allPatients controle ")

  
  res.status(200).json({
    success : true ,
    patients : getAllPatients
  })


})


export {
    allPatients
}