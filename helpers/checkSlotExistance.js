import Prisma from "../prisma.js"

const checkSlotExistance = async (slotId ) => {

    const slotExists = await Prisma.timeSlot.findUnique({
        where : {id :  parseInt(slotId)}
    })
    if(!slotExists) throw new CustomError(`slot not found with this ${slotId}` , 401 , "line 32 updateslot")

    return slotExists
}

export {
    checkSlotExistance
}