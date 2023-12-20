import { Router } from "express";
import { createAccount } from "../controlers/userControler/createAccount.js";
import { getProfiles } from "../controlers/userControler/getProfiles.js";
import { deleteProfiles } from "../controlers/userControler/deleteProfiles.js";
import { deleteOne } from "../controlers/userControler/deleteOne.js";
import { login } from "../controlers/userControler/login.js";
import { logout } from "../controlers/userControler/logout.js";
import { updateProfile } from "../controlers/userControler/updateProfile.js";


const router = Router() 

router.post("/new" , createAccount)
router.get("/profiles" , getProfiles)
router.delete("/delete/all" , deleteProfiles)
router.delete("/delete/:id" , deleteOne)
router.post("/login" , login)
router.get("/logout" , logout)
router.post("update/:id" , updateProfile)

export {
    router
}
// todo things 
// 1 add avatar feature 
// 2 add refreash token 
// 3 add email verifacaton 
// 4 add otp verification 
// 5 add social auth oauth using passport.js
// 6 add forgot and reset passaword feature 
// 7 Account Deactivation feature // or banning 