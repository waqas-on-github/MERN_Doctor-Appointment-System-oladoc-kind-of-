import { Router } from "express";
import { createAccount } from "../controlers/userControler/createAccount.js";

const router = Router() 

router.post("/new" , createAccount)

export {
    router
}