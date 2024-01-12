import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import Prisma from "../../prisma.js";
import { validateById } from "../../helpers/validateById.js";
import { updateSlotSchema } from "../../validationSchema/slot.Schema.js";
import { sanitizeData } from "../userControler/createAccount.js";
import  {checkSlotExistance}  from '../../helpers/checkSlotExistance.js'


const updateSlot = asyncHandler(async(req, res) => {

// check id 
 const id = await validateById(req)

 // validate input 
 const {error} = updateSlotSchema.validate(req.body)
 if(error) throw new CustomError(error.message , error.code || 401 , error.stack)
 
// sanitize data 
const sanitizedData = sanitizeData(req.body)

// check slot existance before updating 

await checkSlotExistance(id)

//update slot 

const updatedslot = await updateAnyFieldInSlot(sanitizedData , id )

res.status(201).json({ 
    success : true , 
    updateslot : updatedslot
})

})






const updateAnyFieldInSlot = async (data , slotId) => {
 
    // update slot data by id 
    const updatedSlot = await Prisma.timeSlot.update({
        where : {id : parseInt(slotId)} , 
        data   : data 
    })

    if(!updatedSlot) throw new CustomError(`slot can not be updated by this id ${slotId}` , 401 , "line 50 updateslot")

    return updatedSlot

}
export {
    updateSlot,
    updateAnyFieldInSlot
}