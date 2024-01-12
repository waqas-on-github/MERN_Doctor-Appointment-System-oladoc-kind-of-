import Prisma from '../../prisma.js'
import asyncHandler from '../../utils/asyncHandler.js'
import CustomError from '../../utils/CustomError.js'
import { validateById } from '../../helpers/validateById.js'

const deleteOneDoctor = asyncHandler(async(req, res) => {

  // id validation 
  const id = validateById(req)

  // delete doctor by its id 

  const deleted = await Prisma.doctor.delete({
    where   : {id : parseInt(id)}
  })

  if(!deleted) throw new CustomError("doctor can not delted " , 401  ,"delte doctor line 17")

  res.status(200).json({
    success: true , 
    deleted : deleted 
  })


})


export {
    deleteOneDoctor
}