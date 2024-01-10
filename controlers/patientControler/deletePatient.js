import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import Prisma from "../../prisma.js";
import { idSchema } from "../../validationSchema/user.schema.js";

const deleteOne = asyncHandler(async (req, res) => {
  
  // paramaters schema validation
const id =    validatePatientById(req)
  // check user existance
  const deleted = await deleteOnePatient(id);

  res.status(200).json({
    success: true,
    deleted: deleted,
  });
});

// delete one patient
const deleteOnePatient = async (userId) => {
  const patientExists = await Prisma.patient.delete({
    where: { id: Number(userId) },
  });

  if (!patientExists)
    throw new CustomError(
      "patient can not be deleted  ",
      401,
      "stack 27 line deletOne"
    );

  return patientExists;
};

const validatePatientById = (req) => {
  const {id } = req.params;
  // error handling
  const { error } = idSchema.validate(id);
  if (error) throw new CustomError(error.message, error.code, error.stack);

  return id
} 

export { deleteOne , validatePatientById};
