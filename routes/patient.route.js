import { Router } from "express";
import { createPatient } from "../controlers/pstirntControler/createPatient.js";
import { deleteOne } from "../controlers/pstirntControler/deletePatient.js";
import { deletePatients } from "../controlers/pstirntControler/deleteAllPatient.js";
import { allPatients } from "../controlers/pstirntControler/getAllPatients.js";
import { getOnePatient, getOnePatientWithProfile } from "../controlers/pstirntControler/getOnePatient.js";
import { updatePatient } from "../controlers/pstirntControler/updatePatinet.js";

const router = Router() 


router.post('/new' , createPatient )
router.delete("/delete/all" , deletePatients )
router.delete("/delete/:id" ,deleteOne )
router.get("/all" , allPatients)
router.get("/:id" , getOnePatient)
router.get("/profile/:id" , getOnePatientWithProfile)
router.patch("/update/:id" , updatePatient)

export {
    router
}