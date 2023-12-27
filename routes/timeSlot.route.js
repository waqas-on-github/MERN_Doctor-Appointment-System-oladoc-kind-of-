import { Router } from "express";
import { createSlot } from "../controlers/TimeSlot/createTimeSlot.js";

const router = Router()

router.get('/' , (req, res) =>res.send("sanity check"))

router.post("/new" , createSlot)


export {
    router
}