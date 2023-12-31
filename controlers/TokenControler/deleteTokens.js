import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import Prisma from "../../prisma.js";
import { validateById } from "../doctorControler/getOneDoctor.js";


const deleteTokenTable  = asyncHandler(async(req, res ) => {

    const id = validateById(req)
   
    const deleted = await deleteAllFromTokenTable(id)

    res.status(200).json({
        success : true , 
        deleted : deleted
    })

})



const deleteAllFromTokenTable = async (tokenId) => {

    const deleted = await Prisma.tokens.delete({
        where : {
            id :   parseInt(tokenId)
        }
    })

     if(!deleted) throw new CustomError(`failed to delete recode with id ${tokenId}` , 401 , "line 24 deleteToken")

    return deleted
} 


export  {
    deleteTokenTable
    , deleteAllFromTokenTable
}