import asyncHandler from "../../utils/asyncHandler.js";
import { updateAnyFieldInDb } from "./login.js";

const cookieoptionslogout = {
    httpOnly: true,
    expires: new Date(Date.now()),
  };

// user logout 
const logout = asyncHandler(async (req, res) => {

  const user = req.user
// clear cookies first 
  res.cookie("AccessToken", null,  cookieoptionslogout);
  res.cookie("RefreshToken", null,  cookieoptionslogout);
// delete refresh token from user table in db 
 const updateResult =   await  updateAnyFieldInDb(user.id , null , "updating/deleting")

  res.status(200).json({
    success: true,
    message: "user logged out",
    responce : updateResult
  });
});




export {  logout };