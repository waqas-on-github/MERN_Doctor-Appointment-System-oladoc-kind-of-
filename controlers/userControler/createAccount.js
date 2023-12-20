import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import bcrypt from "bcryptjs";
import { userschemaforCreateAccount } from "../../validationSchema/user.schema.js";
import { generateAccessToken } from "../../utils/generatejwt.js";
import Prisma from "../../prisma.js";
import sanitizeHtml from "sanitize-html";
import { cookieOptions } from "./cookieOptions.js";


const createAccount = asyncHandler(async (req, res) => {
  

  // input validation
  const { error } = userschemaforCreateAccount.validate(req.body);
   // if we git error 
  if (error) throw new CustomError(error.message, 401, "stack line 28");
  // hashing password
  const hashPass = await bcrypt.hash(req.body.password, 10);
  //senitize incoming data 
  const senitizedata = sanitizeData(req.body)
  // checking user existance in db records
  const DoseExists = await CheckUserExists(senitizedata.email);
  // call create user funcation
  const createUser = await createUserInDatabase( senitizedata, hashPass);
  // generate and  set token 
  const token = await generateAndSetToken( res , createUser)

  //for saftey
  createUser.password = undefined;
 // send response on successfull user creation 
  res.status(201).json({
    success: true,
    user: createUser,
    token: token,
  });
});

// create/register user in database
const createUserInDatabase = asyncHandler( async(userData, hashedPassword) =>{
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
})
// delete user from database
 const  deleteUserInDatabase = asyncHandler( async (userId) =>  {
  const deleteUser = await Prisma.user.delete({
    where: { id: userId },
  });

  return deleteUser;
})

// check dose user exits in db records 
const  CheckUserExists =  asyncHandler (async(email) =>  {
  const DoseExists = await Prisma.user.findUnique({
    where: { email: email },
  });
  // throw error if user exists
  if (DoseExists) throw new CustomError("user already registerd", 401);

  return DoseExists;
})


//senitize data 
const sanitizeData = (data) => {
  const sanitizedData = {...data };

  Object.keys(sanitizedData).forEach((key) => {
    if (typeof sanitizedData[key] === "string") {
      sanitizedData[key] = sanitizeHtml(sanitizedData[key]);
    }
  });
  

  return sanitizedData;

};


async function generateAndSetToken(res, user) {
  try {
    const token = await generateAccessToken(user);
       // set toekn into cookies
      res.cookie("token", token, cookieOptions);
      // if request if coming from mobile app
      res.header("Authorization", `Bearer ${token}`);
    return token;
  } catch (error) {
    console.error("Token generation failed:", error);
    throw new CustomError("User registration failed. Please try again later.", 500, "Token generation error");
  }
}


export { createAccount, deleteUserInDatabase, createUserInDatabase , CheckUserExists , sanitizeData ,generateAndSetToken};
/// things to do 
//1 refreash token 


