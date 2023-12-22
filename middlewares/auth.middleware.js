import JWT from 'jsonwebtoken';
import CustomError from  '../utils/CustomError.js'
import asyncHandler from '../utils/asyncHandler.js';
import { getOneUser } from '../controlers/userControler/getProfile.js';

export const isLoggendIn =   asyncHandler (async (req, res, next) =>{
    // 1 check if user has token 
    // 2 if user has token check if toke is same as before mean its not modified
    // 3 if both conditions are okey insert user to req

    let token;
  
     
    if (req?.cookies?.AccessToken || (req.headers.Authorization && req.headers.Authorization.startsWith("Bearer")) ) {
        token = req.cookies.AccessToken || req.headers.Authorization.split(" ")[1]
        
        // token = "Bearer gbhnjm235r5hbnj"
    }
   
     if (!token) {
         throw new CustomError("Not authorized to access this resource", 401)
     }

    
        const decodedJwtPayload = JWT.verify(token, process.env.ACCESS_SECRET);
        // console.log("data in auth middleware ==============================");
        // console.log(decodedJwtPayload .data?.id );
        // console.log("data in auth middleware ==============================");
        if(!decodedJwtPayload) throw new CustomError("token is invalid or can not be decoded")
         req.user = await getOneUser(decodedJwtPayload.data?.id)
    

         if(!req.user) {
             throw new CustomError("Not authorized to access this resource", 401)
            }

            next()
    



})

// Define the authorize function
export const authorize = (...requiredRoles) => {
    return  function (req, res, next) {
      
        // Check if the user's role is included in the list of required roles
        if (!req.user || !requiredRoles.includes(req.user.role)) {
          // If req.user is undefined or the user's role is not in the required roles, throw an error

         return res.json({
           sucess : false ,
           error : ` ${req?.user?.role} are not allowed to access this resource`
          }
          )}

        // If the user's role is in the required roles, proceed to the next middleware/route handler
        
        next();
    }
    };


    

