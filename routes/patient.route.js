import { Router } from "express";
import { createPatient } from "../controlers/patientControler/createPatient.js";
import { deleteOne } from "../controlers/patientControler/deletePatient.js";
import { deletePatients } from "../controlers/patientControler/deleteAllPatient.js";
import { allPatients } from "../controlers/patientControler/getAllPatients.js";
import { getOnePatient, getOnePatientWithProfile } from "../controlers/patientControler/getOnePatient.js";
import { updatePatient } from "../controlers/patientControler/updatePatinet.js";

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