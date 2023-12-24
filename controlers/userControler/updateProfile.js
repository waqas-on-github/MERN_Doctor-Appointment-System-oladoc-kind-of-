import Prisma from "../../prisma.js";
import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import { userschemaforUpdateProfile } from "../../validationSchema/user.schema.js";
import {sanitizeData} from './createAccount.js'
import { userIdSchema } from "../../validationSchema/user.schema.js";


const updateProfile = asyncHandler(async(req, res) => {

   const file = req?.file 
  // todo do this error handling after  implementing front end avatar upload feature 
   const {id} =  req?.params
   // validate user id 
   // await validateId(id)
   // validate user inputs 
   const {error} = userschemaforUpdateProfile.validate(req.body) 
   if(error) throw new CustomError(error?.message , error?.code  , error?.stack)
   // senitize data 
   const senitizedData = sanitizeData(req?.body) 
   //check user exist or not 
    await checkUserExistsById(id)

   // update user profile 
   const updated = await updateProfileById(senitizedData , id) 
   // send back responce on successfull update 
   res.status(201).json({ 
      success : true ,
      updated : updated
   })



})

// check user existance 
const  checkUserExistsById = async(userId) => {
   try {
      
      var doseUserExists = await Prisma.user.findUnique({
         where : {id : Number(userId) }
      })
        console.log(doseUserExists);
      if(!doseUserExists) throw new CustomError("user not found" , 401 , "line 27 updateprofile controler")

   } catch (error) {

     throw new CustomError ("error finding user " , 400 , "line 46 updateprofile controler"  ) 
}


     return doseUserExists


}

// update user profile by id 
const updateProfileById = async(data , userId ) => {
   try {

      var updateUser = await Prisma.user.update({
         where : { id:  Number(userId)}, 
         data :  data 
        })

   if(!updateUser)  throw new CustomError("user profile not update" ,401 , "line 56 update user controler")}

   catch (error) {  
     throw new CustomError ("error updating  user with " + Number(userId)  + "in users tabel " , 400 , "line 46 updateprofile controler"  )       
   }
   
   

   return updateUser


}

// validate user id schema 
const validateId = async (userId) => {
   const id = Number(userId)

   console.log(typeof(id));

   const {error} = userIdSchema.validate(id)
   if(error) throw new CustomError(error.message , error.code , error.stack)


}


export  {
   updateProfile ,
   checkUserExistsById, 
   updateProfileById
}