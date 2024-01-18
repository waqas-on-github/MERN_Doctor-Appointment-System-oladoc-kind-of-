import CustomError from "../../utils/CustomError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import Prisma from "../../prisma.js";
import { validatePatientById } from "../patientControler/deletePatient.js";


const deleteOne = asyncHandler(async (req, res) => {

    // validate id 
    const id = validatePatientById(req)

    // checking are tokens exists associated to this user 
    await checkAndDeleteTokens(id)

    // delete user 
    const deleted = await Prisma.user.delete({ 
      where: { id: Number(id) },
    });
 
    console.log(deleted);

    if (!deleted) {
      throw new CustomError("User cannot be deleted", 410, "line 14 delete one controller");
    }
   
    res.status(200).json({
      success: true,
      deleted : deleted
    });

  
});



const checkAndDeleteTokens = async (userId) => {

  // checking are tokens exists associated to this user 
  const doseTokenExists = await Prisma.tokens.findUnique({
    where : {
      userId : parseInt(userId)
    }
  })

  if(!doseTokenExists) {
    return true
  }

  if(doseTokenExists){

  
  const deleteTokenRecord = await Prisma.tokens.delete({
    where : {
      userId : parseInt(userId)
    }
  })
  return deleteTokenRecord
  }
  

}


export {
  deleteOne
}