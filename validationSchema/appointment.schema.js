import Joi from "joi";


const appointmentSchema = Joi.object({


    doctorId  :Joi.number().required(),   
    patientId :Joi.number().required(),  
    status    :Joi.string().required(),  
    
  
})


export{
    appointmentSchema
}