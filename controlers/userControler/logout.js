import Prisma from "../../prisma.js";
import asyncHandler from "../../utils/asyncHandler.js";

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
 const updateResult =   await  updateTokensTable(user.id , null )

  res.status(200).json({
    success: true,
    message: "user logged out",
    responce : updateResult
  });
});


const updateTokensTable = async(tableId = null , userId = null , updateData = null) => {
  // get tokens table accocated to this user 
  const tokenTable = Prisma.tokens.findUnique({
    where : {userId : userId}

  })


  console.log( tokenTable);

}



export {  logout };