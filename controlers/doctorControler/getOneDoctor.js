import asyncHandler from "../../utils/asyncHandler.js";
import { getDoctor } from '../../helpers/getDoctor.js'
import { validateById } from "../../helpers/validateById.js";

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



export { getOneDoctor };
