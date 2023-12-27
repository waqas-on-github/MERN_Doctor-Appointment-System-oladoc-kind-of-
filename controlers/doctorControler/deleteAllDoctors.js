import Prisma from '../../prisma.js'
import asyncHandler from '../../utils/asyncHandler.js'
import CustomError from '../../utils/CustomError.js'

const deleteAllDoctors = asyncHandler(async(req, res) => {


  // delete doctors  

  const deleted = await Prisma.doctor.deleteMany({})

  if(!deleted) throw new CustomError("doctor can not delted " , 401  ,"delte doctor line 17")

  res.status(200).json({
    success: true , 
    deleted : deleted 
  })


})


export {
    deleteAllDoctors
}