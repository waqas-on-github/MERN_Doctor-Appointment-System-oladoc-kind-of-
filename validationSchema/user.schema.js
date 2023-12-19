import Joi from "joi"

const userschema = Joi.object({
   
    firstname             : Joi.string().required(),
    lastname              : Joi.string().required(),
    phone                 : Joi.string().required(),
    email                 : Joi.string().required(),
    password              : Joi.string().required().min(8),
    avatar                : Joi.string(),
    role                  : Joi.string(),
    frogotPasswordToken   : Joi.string(),
    frogotPasswordExpiry  : Joi.string()

})

export {
    userschema
}