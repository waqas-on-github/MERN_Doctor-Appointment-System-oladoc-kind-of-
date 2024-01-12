import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import Prisma from "../../prisma.js";
import { tokenSchema } from "../../validationSchema/token.schema.js";
import { sanitizeData } from "../../helpers/sanitizeData.js";



const addTokens = asyncHandler(async(req = null, res = null ) => {

    // inputs validation 
    const {error} = tokenSchema.validate(req.body)
    if(error) throw new CustomError(error.message , error.code || 401 , error.stack || "line 13 addtokens")
    //input sanitization 
    const sanitizedData = sanitizeData(req.body)
    // add recods in db 
    const addToken = await Prisma.tokens.create({
        data : sanitizedData
    }) 

    if(!addToken) throw new CustomError("adding data in token table failed " , 401  , "line 22 addtokens controler ")


    res.status(201).json({
        success : true ,
        message : "tokens added successfully"
    })

    
})




export {
    addTokens
}


