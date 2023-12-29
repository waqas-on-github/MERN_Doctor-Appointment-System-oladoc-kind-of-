import Joi from "joi";

const slotSchema = Joi.object({
  
doctorId        : Joi.number().required(), 
days            : Joi.array().items(Joi.string().required()).required(),
startTime       : Joi.string().required(),
endTime         : Joi.string().required(),
duration        : Joi.number().required(),
recurring       : Joi.boolean().required(),
   

})


const updateSlotSchema = Joi.object({

 doctorId        : Joi.number(), 
 days            : Joi.array().items(Joi.string()),
 startTime       : Joi.string(),
 endTime         : Joi.string(),
 duration        : Joi.number(),
 recurring       : Joi.boolean(),
   

})

export {
    slotSchema
    ,updateSlotSchema
}