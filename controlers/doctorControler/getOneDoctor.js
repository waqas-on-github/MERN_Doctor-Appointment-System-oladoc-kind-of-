import Prisma from "../../prisma.js";
import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import { idSchema } from "../../validationSchema/user.schema.js";

const getOneDoctor = asyncHandler(async (req, res) => {
  // parameters validation
  const id = validateById(req);
  // get doctorby id
  const doctor = await getDoctor(id);
  // send responce back
  res.status(200).json({
    success: true,
    doctor: doctor,
  });
});

const getDoctor = async (doctroId) => {
  const doctor = await Prisma.doctor.findUnique({
    where: { id: parseInt(doctroId) },
  });
  if (!doctor)
    throw new CustomError("doctor not found ", 401, "line 20 getonedoctor");

  return doctor;
};

const validateById = (req) => {
  const { id } = req.params;
  // error handling
  const { error } = idSchema.validate(id);
  if (error)
    throw new CustomError(error.message, error.code || 401, error.stack);

  return id;
};

export { validateById, getOneDoctor, getDoctor };
