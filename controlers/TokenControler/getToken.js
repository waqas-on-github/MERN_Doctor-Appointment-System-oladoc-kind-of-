import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import Prisma from "../../prisma.js";
import { validateById } from "../doctorControler/getOneDoctor.js";

const getToken = asyncHandler(async (req = null, res = null) => {
  // validate id
  const id = validateById(req);

  // get token info

  const tokenTable = await getTokenById(id, null);

  // send tokens back
  res.status(200).json({
    success: true,
    tokentable: tokenTable,
  });
});

// get token
const getTokenById = async (paramsId, userId = null) => {
  let tokenTable;

  if (paramsId) {
    tokenTable = Prisma.tokens.findUnique({
      where: { id: parseInt(paramsId) },
    });
  }

  if (userId || userId !== null) {
    tokenTable = Prisma.tokens.findUnique({
      where: { userId: userId },
    });
  }

  if (!tokenTable)
    throw new CustomError(
      "failed to get tokenn table data",
      401,
      "line 31 getToken controler"
    );

  return tokenTable;
};

export { getToken, getTokenById };
