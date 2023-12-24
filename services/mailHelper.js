import CustomError from '../utils/CustomError.js'
import {transporter} from './mailService.js'

const mailHelper = async (option ) =>  {

  const message =  {
    from : process.env.MAIL_SENDER , 
    // to : option?.email , 
    // subject :  option?.subject , 
    // text: option?.text

   }

   try {
    
       await transporter.sendMail(message)
   } catch (error) {
    console.log(error);
        throw new CustomError("mail sending failed " , 401 , "mailHelper line 18")
   }



}


export  {
    mailHelper
}
