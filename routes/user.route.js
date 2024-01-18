import { Router } from "express";
import { createAccount } from "../controlers/userControler/createAccount.js";
import { getProfiles } from "../controlers/userControler/getProfiles.js";
import { deleteProfiles } from "../controlers/userControler/deleteProfiles.js";
import { deleteOne } from "../controlers/userControler/deleteOne.js";
import { login } from "../controlers/userControler/login.js";
import { logout } from "../controlers/userControler/logout.js";
import { updateProfile } from "../controlers/userControler/updateProfile.js";
import { upload } from "../services/multerService.js";
import { limiter } from "../middlewares/rateLimiter.js";
import {isLoggendIn } from "../middlewares/auth.middleware.js";
import { refreshAccessToken } from "../controlers/userControler/refreshAccesstoken.js";
import { verifyEmail } from "../controlers/userControler/verifyEmail.js";



const router = Router() 

router.post("/new"  ,createAccount)
router.get("/profiles" ,   getProfiles)
router.delete("/delete/all" , deleteProfiles)
router.delete("/delete/:id" , deleteOne)
router.post("/login" , limiter , login) // rate limit on more then 50 request per 15 minuts on this route
router.get("/logout" , isLoggendIn,logout)
router.post("/update/:id", updateProfile)
router.post("/refresh" , refreshAccessToken)
router.get("/verify/:token" , verifyEmail)

export {
    router
}

// todo featurs  
// round #1 
// 1 add avatar feature  // wroked on backend end and  waitng for fully implemented on front end 
// 2 add refreash token   // day 02 
// 3 add email verification // day 02 also  
// 4 add forgot and reset passaword feature  day 03 
// round #2 // in next phase 
// 5 add otp verification 
// 6 add social auth oauth using passport.js
// 7 Account Deactivation feature // or banning 
// round #3 
// 8 Password strength checks: Enforce minimum length, complexity, and prevent common passwords.
// 9 Remember me functionality: Allow users to stay logged in across sessions
//10 Temporary account suspension