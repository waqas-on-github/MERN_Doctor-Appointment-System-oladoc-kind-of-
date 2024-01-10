import Joi from "joi";


const createDoctorSchema = Joi.object({

   specializations        : Joi.array().items(Joi.string().required()).required(),   
   qualification          : Joi.array().items(Joi.string().required()).required(),       
   waitTime               : Joi.string().required(), 
   experience             : Joi.number().required(),  
   services               : Joi.array().items(Joi.string().required()), 
   languages              : Joi.array().items(Joi.string().required()),  
   memberships            : Joi.array().items(Joi.string().required()),    
   about                  : Joi.string().required(), 
   userId                 : Joi.number().required()

}) 


const updateDoctorSchema = Joi.object({

    specializations        : Joi.array().items(Joi.string()),   
    qualification          : Joi.array().items(Joi.string()),       
    waitTime               : Joi.string(), 
    experience             : Joi.number(),  
    services               : Joi.array().items(Joi.string()), 
    languages              : Joi.array().items(Joi.string()),  
    memberships            : Joi.array().items(Joi.string()),    
    about                  : Joi.string() , 
    userId                 : Joi.number()
 
 }) 
 


export {
    createDoctorSchema, updateDoctorSchema
}