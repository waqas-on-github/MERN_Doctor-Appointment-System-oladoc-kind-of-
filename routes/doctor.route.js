import { Router } from "express";
import { createDoctor } from "../controlers/doctorControler/createDoctor.js";

const router = Router()

router.get('/' , (req, res) => {res.setEncoding('senit chcke by doctor router')})


router.post("/new" , createDoctor)



export {
    router
}