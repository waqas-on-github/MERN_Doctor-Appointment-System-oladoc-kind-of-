import { Router } from "express";
import { createAppoinmet } from "../controlers/appointmentControler/createAppoinment.js";


const router = Router()
router.get("/" , (req, res) => res.send("sanity check"))
router.post("/new" , createAppoinmet )


export {
    router
}