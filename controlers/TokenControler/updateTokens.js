import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import Prisma from "../../prisma.js";
import { validateById } from "../doctorControler/getOneDoctor.js";
import { tokenUpdateSchema } from "../../validationSchema/token.schema.js";
import { sanitizeData } from "../userControler/createAccount.js";


const UpdateTokens = asyncHandler(async(req, res ) => {

    // validate params id 
    const id = validateById(req)

    // validate inputs 
   const {error} = tokenUpdateSchema.validate(req.body)
   if(error)  throw new CustomError(error.message , error.code ||401 , error.stack)
     //senitize inputs 
   const sanitizedData = sanitizeData(req.body)
 
    // update table
   const updated = await updateTokenTable( id , null , sanitizedData)
 

    // send responce back
 res.status(200).json({
    success :  true , 
    updated : updated
 })


})


const updateTokenTable = async (paramsId , userId = null , data ) => {

    // update tokens table 

    let updated ;

    if(paramsId) {
        updated = await Prisma.tokens.update({
           where :  {id :  parseInt(paramsId)},
           data  : data 
    
         })
    }

  if(userId) {
    updated = await Prisma.tokens.update({
        where : {userId : userId} , 
        data : data 
    })
  }

     if(!updated) throw new CustomError(`token table not updated with id ${paramsId} or userId ${userId} ` , 401 , "line 29 updateToken controler")

     return updated


}

export {
    UpdateTokens, 
    updateTokenTable
}