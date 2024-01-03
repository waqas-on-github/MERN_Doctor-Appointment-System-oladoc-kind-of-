import { Router } from "express";
import { seedTimestemps } from "../controlers/slotTimestempsControlers/createTimestemps.js";


const router = Router() 

router.post("/new" , seedTimestemps )

export {
    router
}