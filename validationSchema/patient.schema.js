import Joi from "joi";


const patientSchema = Joi.object({
    contact      : Joi.string().required() ,
    dateOfBirth  : Joi.date().required() ,
    userId       : Joi.number().required() 
  
})


export{
    patientSchema
}