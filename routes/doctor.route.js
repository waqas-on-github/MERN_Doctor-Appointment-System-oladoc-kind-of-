import { Router } from "express";
import { createDoctor } from "../controlers/doctorControler/createDoctor.js";
import { getAllDoctors } from "../controlers/doctorControler/getAllDoctors.js";
import { getOneDoctor } from "../controlers/doctorControler/getOneDoctor.js";
import { deleteOneDoctor } from "../controlers/doctorControler/deleteOneDoctor.js";
import { updateDoctor } from "../controlers/doctorControler/updateDoctor.js";
import { deleteAllDoctors } from "../controlers/doctorControler/deleteAllDoctors.js";

const router = Router()

router.get('/' , (req, res) => {res.setEncoding('senity chcke by doctor router')})


router.post("/new" , createDoctor)
router.get("/all" , getAllDoctors) 
router.get("/:id" , getOneDoctor)
router.delete("/delete/:id" , deleteOneDoctor)
router.delete('/delete/all' , deleteAllDoctors )
router.patch("/update/:id" , updateDoctor)



export {
    router
}