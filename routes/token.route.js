import { Router } from "express";
import { addTokens } from "../controlers/TokenControler/addTokens.js";
import { getToken } from "../controlers/TokenControler/getToken.js";
import { UpdateTokens } from "../controlers/TokenControler/updateTokens.js";
import { deleteTokenTable } from "../controlers/TokenControler/deleteTokens.js";



const router =  Router()

router.get("/" , (req, res) => res.send("tokens sanity check"))
router.post("/new" , addTokens)
router.get("/:id" , getToken)
router.patch("/update/:id" , UpdateTokens )
router.delete("/delete/:id" , deleteTokenTable )
export {
    router
}