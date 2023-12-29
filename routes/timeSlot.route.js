import { Router } from "express";
import { createSlot } from "../controlers/TimeSlot/createTimeSlot.js";
import { getAllSlots } from "../controlers/TimeSlot/getallSlots.js";
import { getOneSlot } from "../controlers/TimeSlot/getOneSlots.js";
import { updateSlot } from "../controlers/TimeSlot/updateSlot.js";
import { deleteSlot } from "../controlers/TimeSlot/deleteslot.js";

const router = Router()

router.get('/' , (req, res) =>res.send("sanity check"))

router.post("/new" , createSlot)
router.get("/all" , getAllSlots)
router.get("/:id" , getOneSlot)
router.patch("/update/:id" , updateSlot)
router.delete("/delete/:id" , deleteSlot)



export {
    router
}