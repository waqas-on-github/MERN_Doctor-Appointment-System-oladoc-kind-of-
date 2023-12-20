import Prisma from "../../prisma.js";
import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import { userschemaforUpdateProfile } from "../../validationSchema/user.schema.js";
import {sanitizeData} from './createAccount.js'
import { validateId } from "./deleteOne.js";



const updateProfile = asyncHandler(async(req, res) => {
   const {id} = req.params
   // validate user id 
   await validateId(id)
   // validate user inputs 
   const {error} = userschemaforUpdateProfile.validate(req.body) 
   if(error) throw new CustomError(error.message , error.code  , error.stack)
   // senitize data 
   const senitizedData =  sanitizeData(req.body) 
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


const  checkUserExistsById = asyncHandler( async(userId) => {

   const doseUserExists = await Prisma.user.findUnique({
      where : {id : userId }
   })

   if(!doseUserExists) throw new CustomError("user not found" , 401 , "line 27 updateprofile controler")


   return doseUserExists
})


const updateProfileById = asyncHandler(async(data , userId ) => {

   const updateUser = await Prisma.user.update({
    where : { id:  userId}, 
    data :  data 
   })
   
   if(!updateUser)  throw new CustomError("user profile not update" ,401 , "line 56 update user controler")
   return updateUser


})




export  {
   updateProfile ,
   checkUserExistsById, updateProfileById
}