import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import bcrypt from "bcryptjs";
import { userschemaforCreateAccount } from "../../validationSchema/user.schema.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generatejwt.js";
import Prisma from "../../prisma.js";
import sanitizeHtml from "sanitize-html";
import { cookieOptions } from "./cookieOptions.js";
import { uploadSingle } from "../../services/uploadservice.js";

const createAccount = asyncHandler(async (req, res) => {
  // input validation
  const { error } = userschemaforCreateAccount.validate(req.body);
  // if we git error
  if (error) throw new CustomError(error.message, 401, "stack line 28");
  // hashing password
  const hashPass = await bcrypt.hash(req.body.password, 10);
  // upload image on cloudnairy
  // const result = await uploadSingle(req,res) // will be uncomented later
  //senitize incoming data
  const senitizedata = sanitizeData(req.body); // avatar url will be added after frontend implementation
  // checking user existance in db records
  const DoseExists = await CheckUserExists(senitizedata.email);

  if (DoseExists) throw new CustomError("user already registerd", 401);

  // call create user funcation
  const createdUser = await createUserInDatabase(senitizedata, hashPass);
  // generate and  set token
  const {AccessToken, RefreshToken} = await generateAndSetAccessAndRefreshTokens(res, createdUser ,"createUser");
  // saved genereted refresh token into db
  const updatedUser = await saveRefreshTokenInToDb( createdUser?.id,RefreshToken,"saved");
  //for saftey
  updatedUser.password = undefined;
  // send response on successfull user creation
  res.status(201).json({
    success: true,
    user: updatedUser,
    tokens: { AccessToken, RefreshToken },
  });
});

// create/register user in database
const createUserInDatabase = async (userData, hashedPassword) => {
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
};

// delete user from database
const deleteUserInDatabase = async (userId) => {
  const deleteUser = await Prisma.user.delete({
    where: { id: userId },
  });

  return deleteUser;
};

// check dose user exits in db records
const CheckUserExists = async (email) => {
  const DoseExists = await Prisma.user.findUnique({
    where: { email: email },
  });

  return DoseExists;
};

//senitize data
const sanitizeData = (data) => {
  const sanitizedData = { ...data };

  Object.keys(sanitizedData).forEach((key) => {
    if (typeof sanitizedData[key] === "string") {
      sanitizedData[key] = sanitizeHtml(sanitizedData[key]);
    }
  });

  return sanitizedData;
};

// generate tokens set cookies  and save into db
async function generateAndSetAccessAndRefreshTokens(res, user , callContext) {
  try {
    const AccessToken = await generateAccessToken(user);
    const RefreshToken = await generateRefreshToken(user);

    //  save Refresh Token into user model

    // set tokens into cookies
    res.cookie("AccessToken", AccessToken, cookieOptions);
    res.cookie("RefreshToken", RefreshToken, cookieOptions);

    // if request if coming from mobile app
    res.header("Authorization", `Bearer ${AccessToken}`);
    res.header("Authorization", `Bearer ${RefreshToken}`);

    return { AccessToken, RefreshToken};
  } catch (error) {

    if(callContext==="createUser"){
      await deleteUserInDatabase(user?.id);
    }

    throw new CustomError(
      error.message || "User registration failed. Please try again later",
      500,
      "Token generation error"
    );
  }
}

// save refresh token into db
const saveRefreshTokenInToDb = async (
  userId,
  RefreshToken,
  CustomErrorMessage
) => {
  try {
    var updatedUser = await Prisma.user.update({
      where: { id: Number(userId) },
      data: { refreshToken: RefreshToken },
    });
    if (!updatedUser)
      throw new CustomError(
        `error while ${CustomErrorMessage} refreshtoken in database`,
        500,
        "line 137 create user controler"
      );
  } catch (error) {
    throw new CustomError(
      error.message ||
        `error while ${CustomErrorMessage} refreshtoken in database`,
      500,
      "line 137 create user controler"
    );
  }
  return updatedUser;
};



export {
  createAccount,
  deleteUserInDatabase,
  createUserInDatabase,
  CheckUserExists,
  sanitizeData,
  generateAndSetAccessAndRefreshTokens,
  saveRefreshTokenInToDb as updateRefreshTokenInDb,
};
