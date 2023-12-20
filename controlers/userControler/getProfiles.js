import Prisma from "../../prisma.js";
import CustomError from "../../utils/CustomError.js";
import asyncHandler from "../../utils/asyncHandler.js";


const getProfiles = asyncHandler(async(req, res) => {

    const userData =  await Prisma.user.findMany()

    if(!userData) throw new CustomError("userdata not found " , 401 , "getprofile line 10")

    res.status(200).json({
        success : true , 
        userData : userData
    })

})

export {
    getProfiles
}