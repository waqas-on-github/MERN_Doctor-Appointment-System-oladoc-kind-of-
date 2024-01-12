import Prisma from '../../prisma.js'
import asyncHandler from '../../utils/asyncHandler.js'
import CustomError from '../../utils/CustomError.js'
import { updateDoctorSchema } from '../../validationSchema/doctor.schema.js'
import { sanitizeData } from '../userControler/createAccount.js'
import { validateById } from '../../helpers/validateById.js'


const updateDoctor = asyncHandler(async(req, res) => {

    // validate id 
    const id = validateById(req)
   
    // validate data 
     const {error} = updateDoctorSchema.validate(req.body)
     if(error) throw new CustomError(error.message , error.code || 401 , error.stack)

    // senitize data 
    const sanitizedData = sanitizeData(req.body)

    // add data into db 

    const updated = await Prisma.doctor.update({
        where: {id : parseInt(id)} , 
        data : sanitizedData
    })

    if(!updated) throw new CustomError("doctor can't updated " , 401 , "line 28 updatedoctor" )

    res.status(200).json({
        success : true , 
        updated : updated 
    })

})

export{
    updateDoctor
}