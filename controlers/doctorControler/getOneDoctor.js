import Prisma from '../../prisma.js'
import asyncHandler from '../../utils/asyncHandler.js'
import CustomError from '../../utils/CustomError.js'
import { idSchema } from '../../validationSchema/user.schema.js'


const getOneDoctor = asyncHandler(async(req, res) => {
   // parameters validation
    const id = validateById(req)

    const doctor = await Prisma.doctor.findUnique({
        where : {id: parseInt(id)}
    })
    if(!doctor) throw new CustomError("doctor not found " , 401 , "line 20 getonedoctor")

    res.status(200).json({
        success : true , 
        doctor : doctor
    })


})




const validateById = (req) => {
    const { id } = req.params;
    // error handling
    const { error } = idSchema.validate(id);
    if (error) throw new CustomError(error.message, error.code, error.stack);
  
    return id
  } 



  export {
    validateById, getOneDoctor
  }