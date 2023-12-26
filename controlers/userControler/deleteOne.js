import CustomError from "../../utils/CustomError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import Prisma from "../../prisma.js";
import { validatePatientById } from "../pstirntControler/deletePatient.js";


const deleteOne = asyncHandler(async (req, res) => {
     // validate id 

     const id = validatePatientById(req)

    // delete user 
    const deleted = await Prisma.user.delete({ 
      where: { id: Number(id) },
    });

    if (!deleted) {
      throw new CustomError("User cannot be deleted", 410, "line 14 delete one controller");
    }
   
    res.status(204).json({
      success: true,
      deleted: deleted,
    });

  
});


export {
  deleteOne
}