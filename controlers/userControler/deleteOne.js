import CustomError from "../../utils/CustomError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { userIdSchema } from "../../validationSchema/user.schema.js";
import Prisma from "../../prisma.js";


const deleteOne = asyncHandler(async (req, res) => {
  // delete user account by id 
  const { id } = req.params;

  // validate user id 
  const { error } = userIdSchema.validate(id);
  if (error) throw new CustomError(error.message, error.code, error.stack);


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