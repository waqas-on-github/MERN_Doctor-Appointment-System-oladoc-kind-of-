import Joi from "joi";


const tokenSchema = Joi.object({
    userId                    :  Joi.number().required() , 
    refreshToken              :  Joi.string(), 
    varificationToken         :  Joi.string(), 
    emailVarificationToken    :  Joi.string(), 
    frogotPasswordToken       :  Joi.string(), 
    frogotPasswordExpiry      :  Joi.date()
})


const tokenUpdateSchema = Joi.object({
    userId                    :  Joi.number() , 
    refreshToken              :  Joi.string(), 
    varificationToken         :  Joi.string(), 
    emailVarificationToken    :  Joi.string(), 
    frogotPasswordToken       :  Joi.string(), 
    frogotPasswordExpiry      :  Joi.date()

})

export {
    tokenSchema
    , tokenUpdateSchema
}