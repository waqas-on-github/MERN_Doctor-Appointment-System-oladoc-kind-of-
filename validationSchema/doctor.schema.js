import Joi from "joi";


const createDoctorSchema = Joi.object({

   specializations        : Joi.array().items(Joi.string().required()).required(),   
   qualification          : Joi.array().items(Joi.string().required()).required(),       
   waitTime               : Joi.string().required() , 
   experience             : Joi.number().required() ,  
   services               : Joi.array().items(Joi.string().required()), 
   languages              : Joi.array().items(Joi.string().required()),  
   availability           : Joi.boolean().required(),   
   memberships            : Joi.array().items(Joi.string().required()),    
   about                  : Joi.string().required() , 
   userId                 : Joi.number().required()

}) 


export {
    createDoctorSchema
}