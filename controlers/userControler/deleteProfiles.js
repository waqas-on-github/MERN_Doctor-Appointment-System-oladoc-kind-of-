import Prisma from "../../prisma.js";
import CustomError from "../../utils/CustomError.js";
import asyncHandler from "../../utils/asyncHandler.js";


const deleteProfiles = asyncHandler(async(req, res) => {

const deleteProfiles = await Prisma.user.deleteMany()
if(!deleteProfiles) throw   new CustomError("profiles can not delted for some reason try again" , 401 , "dleteprofile line 8") 
res.status(200).json({ 
    success : true ,
    deleted : deleteProfiles
})

})



export {
    deleteProfiles
}