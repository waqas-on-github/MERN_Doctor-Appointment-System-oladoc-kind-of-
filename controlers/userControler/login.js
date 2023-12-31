import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import bcrypt from "bcryptjs";
import {sanitizeData }from "./createAccount.js"
import { CheckUserExists } from "./createAccount.js";
import { userLoginSchema } from "../../validationSchema/user.schema.js";
import { generateAccessToken ,  generateRefreshToken } from "../../utils/generatejwt.js";
import { cookieOptions } from "../../utils/cookiesOptions.js";
import Prisma from "../../prisma.js";


const login = asyncHandler(async (req, res) => {

// input validation 
  const { error } = userLoginSchema.validate(req.body);
  if (error) throw new CustomError(error.message, error.code);

  // data senitization
  const senitizedata = sanitizeData(req.body)
  // checking user existance in db records
  const User = await CheckUserExists(senitizedata.email);
  //throw error if user not found 
  if (!User)
    throw new CustomError( "you entered wrong email ",400,"log in func line 41");
// compare password 
  const checkpass = await bcrypt.compare(senitizedata.password, User.password);

  if (!checkpass) throw new CustomError("you enterd wrong password", 401);

  // geenerate and set tokens 
  const {accessToken , refreshToken} = await generateAndSetAccessAndRefreshTokens(res, User)

   if(accessToken && refreshToken) {
     var updatedUser = await addTokensInTokensTable(User.id ,{refreshToken : refreshToken} ,"addig")
   }
 // for safty
 updatedUser.password = undefined


  res.status(200).json({
    success: true,
     data :  updatedUser
  });
});


// generate and set tokens 
async function generateAndSetAccessAndRefreshTokens(res, user ) {
  try {
    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    // set tokens into cookies
    res.cookie("AccessToken", accessToken, cookieOptions);
    res.cookie("RefreshToken", refreshToken, cookieOptions);

    // if request if coming from mobile app
    res.header("Authorization", `Bearer ${accessToken}`);
    res.header("Authorization", `Bearer ${refreshToken}`);

    return { accessToken, refreshToken};
  } catch (error) {

    throw new CustomError(
      error.message || "User registration failed. Please try again later",
      500,
      "Token generation error"
    );
  }
}

//  add refresh token in Token mode accociate with user  
const addTokensInTokensTable = async (userId,updateObject ,CustomErrorMessage) => {

  console.log({...updateObject});

  try {
    var addRefreshToken = await Prisma.tokens.create({
      data : {
        userId : userId , 
        ...updateObject
      }
    });
    if (!addRefreshToken)
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
  return addRefreshToken;
};


export {
    login,
    generateAndSetAccessAndRefreshTokens, 
    addTokensInTokensTable
}