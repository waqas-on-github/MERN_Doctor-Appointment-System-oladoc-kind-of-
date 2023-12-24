import asyncHandler from "../../utils/asyncHandler.js"
import CustomError from '../../utils/asyncHandler.js'
import JWT from "jsonwebtoken"

const verifyEmail = asyncHandler(async(req, res) => {

    const {incomingToken} = req.params
    // verify incoming token fisrt 
   JWT.verify(incomingToken , process.env.EMAIL_VERIFICATION_SECRET)
    
    
   const verifyUrl = `${req.protocol}://${req.get("host")}/api/v1/users/password/reset/${incomingToken}`


   const message = `your reset password url us as folows \n\n\n\n\ ${resetUrl}\n\n\n\n\ if this is not requseted by you please ignore`

     
    
    await mailHelper({ 
      email : user.email , 
      subject :"password change request" , 
      text:  message
     })


})



export{
    verifyEmail
}