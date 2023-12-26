import Joi from "joi"

const userschemaforCreateAccount = Joi.object({
   
    firstname             : Joi.string().required(),
    lastname              : Joi.string().required(),
    username              : Joi.string().required(),
    phone                 : Joi.string().required(),
    email                 : Joi.string().required(),
    password              : Joi.string().required().min(8),
    avatar                : Joi.string(),
    role                  : Joi.string(),
    frogotPasswordToken   : Joi.string(),
    frogotPasswordExpiry  : Joi.string()

})

const userschemaforUpdateProfile = Joi.object({
   
    firstname             : Joi.string(),
    lastname              : Joi.string(),
    username              : Joi.string(),
    phone                 : Joi.string(),
    email                 : Joi.string(),
    password              : Joi.string().min(8),
    avatar                : Joi.string(),
    role                  : Joi.string(),
    frogotPasswordToken   : Joi.string(),
    frogotPasswordExpiry  : Joi.string()

})



const idSchema = Joi.number().integer().required();


const userLoginSchema = Joi.object({
    username : Joi.string(),
    email: Joi.string(),
    password: Joi.string().required(),
  }).xor('username', 'email')


export {
    userschemaforCreateAccount,
    userschemaforUpdateProfile,
    idSchema, 
    userLoginSchema
}