import asyncHandler from "../../utils/asyncHandler.js";

const cookieoptionslogout = {
    httpOnly: true,
    expires: new Date(Date.now()),
  };

// user logout 
const logout = asyncHandler(async (req, res) => {

  res.cookie("token", null , cookieoptionslogout);
  res.header("Authorization", `Bearer "no token"`);



  res.status(200).json({
    success: true,
    message: "user logged out",
  });
});




export {  logout };