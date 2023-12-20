import CustomError from "../../utils/CustomError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { deleteUserInDatabase } from "./createAccount.js";
import { userIdSchema } from "../../validationSchema/user.schema.js";


const deleteOne = asyncHandler(async(req, res) => {
   // delete user account by id 
    const {id} =req?.params
    // validate user id 
     await validateId(id)
    const deleted = await deleteUserInDatabase(id)

    if(!deleted) throw new CustomError("user can not be deleted" , 410 , "line 10 delete one controler") 
    
    res.status(204).json({
      success: true,
      deleted: deleted,
  
    });
});                         



const validateId = asyncHandler(async(id)=>{
  const {error} = await  userIdSchema(id) 
  if(error) throw new CustomError("id provided is not as excepted" , 401 , "line 25  deleteone Controler")
  
})


export {
    deleteOne, validateId
}