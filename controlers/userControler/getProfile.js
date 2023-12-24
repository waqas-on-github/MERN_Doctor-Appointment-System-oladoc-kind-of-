import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import Prisma from "../../prisma.js";

const getProfile = asyncHandler(async(req, res ) => {

  const userId = req?.user?.id ||  req.params.id 

  if(!userId)  throw new CustomError("user id not provided" , 401 , "line 09 getprofile controller")  
  
  const user = await getOneUser(userId)

   // for safety 
   user.id = undefined
 
  req.status(200).json ({ 
    success: true , 
    user : user
  })
  
  
})






const getOneUser = async (userId) => { 

 const user = await Prisma.user.findUnique({
    where : {id :userId}
 }) 

 if(!user) throw new CustomError("can not find user db quer error " , 401 , "line 29 getprofile controler")

 return user


}

export {
    getProfile,
    getOneUser
}