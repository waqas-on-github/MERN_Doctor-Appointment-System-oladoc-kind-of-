import { Router } from "express";
import { seedTimestemps } from "../controlers/slotTimestempsControlers/updateTimestemps.js";

const router = Router() 

router.post("/new" , seedTimestemps )

export {
    router
}