import { Router } from "express";
import { createAppointment } from "../controlers/appointmentControler/createAppoinment.js";


const router = Router()
router.get("/" , (req, res) => res.send("sanity check"))
router.post("/new" , createAppointment )


export {
    router
}