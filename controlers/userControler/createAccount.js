import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import bcrypt from "bcryptjs";
import { userschema } from "../../validationSchema/user.schema.js";
import { generateAccessToken } from "../../utils/generatejwt.js";
import Prisma from "../../prisma.js";

const cookieoptions = {
  httpOnly: true,
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
};

if (process.env.ENVIRONMENT === "PRODUCTION") {
  cookieoptions.secure = true;
}

const createAccount = asyncHandler(async (req, res) => {
  // input validation

  // input validation
  const { error } = userschema.validate(req.body);

  if (error) throw new CustomError(error.message, 401, "stack line 28");
  // hashing password
  const hashPass = await bcrypt.hash(req.body.password, 10);

  // checking user existance in db records

  const DoseExists = await CheckUserExists(req?.body?.email);

  //throw error if user already exists
  if (DoseExists) throw new CustomError("user already registerd", 401);

  // call create user funcation
  const createUser = await createUserInDatabase(req?.body, hashPass);
  if (!createUser)
    throw new CustomError(
      " user can not be created  ",
      401,
      " user controler create account  satck line 41"
    );

  try {
    var token = await generateAccessToken(createUser);
  } catch (error) {
    // if token generation failded delete db record
    await deleteUserInDatabase(createUser.id);
    throw new CustomError(error.message, error.code, error.stack);
  }

  // set toekn into cookies
  res.cookie("token", token, cookieoptions);
  // if request if coming from mobile app
  res.header("Authorization", `Bearer ${token}`);

  //for saftey
  createUser.password = undefined;

  res.status(201).json({
    success: true,
    user: createUser,
    trash: trash,
    token: token,
  });
});

// create/register user in database
async function createUserInDatabase(userData, hashedPassword) {
  const createdUser = await Prisma.user.create({
    data: { ...userData, password: hashedPassword },
  });

  if (!createdUser) {
    throw new CustomError(
      "User cannot be created",
      500,
      "user controller create account stack line 41"
    );
  }

  return createdUser;
}
// delete user from database
async function deleteUserInDatabase(userId) {
  const deleteUser = await Prisma.user.delete({
    where: { id: userId },
  });

  return deleteUser;
}

// check dose user exits in db records 
async function CheckUserExists(email) {
  const DoseExists = await Prisma.user.findUnique({
    where: { email: email },
  });

  return DoseExists;
}

export { createAccount, deleteUserInDatabase, createUserInDatabase , CheckUserExists};
/// things to do 
//1 refreash toke 
//2 data senitazation 


