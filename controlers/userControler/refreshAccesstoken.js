import Prisma from "../../prisma.js";
import CustomError from "../../utils/CustomError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import JWT from 'jsonwebtoken';
import { generateAndSetAccessAndRefreshTokens  , addTokensInTokensTable } from "./login.js"; // addanyfieldindb is removed from here debug code soon





const refreshAccessToken = asyncHandler( async(req, res) => {

     let incomingRefreshToken;
    // get refresh toke form cookes or from headers or from body
      if( req.cookies?.RefreshToken ||req.body.RefreshToken ||  (req.headers.Authorization && req.headers.Authorization.startsWith("Bearer")) )
       {
          incomingRefreshToken = req.cookies?.RefreshToken ||req.body.RefreshToken|| req.headers.Authorization.split(" ")[1]
       }
   // validate token 
     if(!incomingRefreshToken) throw new CustomError("refresh token not found or provided " , 401 , "line 15 refreshAccessToken contriler")
    
     // verify token 
     const varifyToken = JWT.verify(incomingRefreshToken , process.env.REFRESH_SECRET)

     if(!varifyToken) throw new CustomError("refreshtoken is invalid or can not be decoded")
  // get stored refresh token from db 
   const refreashTokenFromDb = await Prisma.user.findUnique({where : {id : varifyToken.data?.id}})    
  
   // compare incomming token with stored token 
   if(incomingRefreshToken !== refreashTokFromDb?.refreshToken) throw new CustomError("token comparision failed " ,400 ,"line 31 refreshAccessToken controler")

   // generate access token and set in cookies 
   const { accessToken, refreshToken } =await generateAndSetAccessAndRefreshTokens(res, refreashTokenFromDb ,"rfreshToken");
   
   await addTokensInTokensTable(refreashTokenFromDb?.id,{ refreshToken: refreshToken},"saved");

     res.status(200).json({
        success : true ,
        refreshToken : refreshToken
     })

})



export {
    refreshAccessToken
}