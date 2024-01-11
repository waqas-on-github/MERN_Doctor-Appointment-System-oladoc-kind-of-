import Joi  from "joi";
import {appointementStatusConstents } from '../utils/constents.js' 

const appointmentSchema = Joi.object({

    doctorId        : Joi.number().required(),   
    patientId       : Joi.number().required(),  
    startTime       : Joi.date().required(),
    // status          : Joi.string().valid(...Object.values(appointementStatusConstents))
    
  
})

const appointmentRequestSchema = Joi.object({

    doctorId       :Joi.number().required(),
    patientId      :Joi.number().required() ,
    timeStempsId   :Joi.number().required()

})

const appointmentUpdateSchema = {

    doctorId        :Joi.number(),   
    patientId       :Joi.number(),  
    startTime       :Joi.date(),
    status          :Joi.string().valid(...Object.values(appointementStatusConstents))


}

export{
    appointmentSchema, 
    appointmentRequestSchema,
    appointmentUpdateSchema
}