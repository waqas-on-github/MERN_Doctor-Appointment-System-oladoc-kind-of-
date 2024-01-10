import { Router } from "express";
import { getAppointmentDetails } from "../controlers/appointmentControler/getAppointmentInfo.js";

const router = Router()
router.get("/" , (req, res) => res.send("sanity check"))
// request sending pattern 
//---> first user will send request to seed datails of specific doctor/clinic 
//---> then on base of outputs patient will select timestemp and request for bookingrequset 

router.post("/details" , getAppointmentDetails )


export {
    router
}