import { Router } from "express";
import { getAppointmentDetails } from "../controlers/appointmentControler/getAppointmentInfo.js";
import { sendAppointmentRequets } from "../controlers/appointmentControler/sendAppointmentRequest.js";
import { acceptAppointmentRequest } from "../controlers/appointmentControler/accepetAppointmentRequest.js";

const router = Router()
router.get("/" , (req, res) => res.send("sanity check"))
// request sending pattern 
//---> first user will send request to seed datails of specific doctor/clinic 
//---> then on base of outputs patient will select timestemp and request for bookingrequset 

router.post("/details" , getAppointmentDetails )
router.post("/request" , sendAppointmentRequets)
router.post("/accept", acceptAppointmentRequest )


export {
    router
}