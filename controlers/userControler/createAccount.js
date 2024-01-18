import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import { userschemaforCreateAccount } from "../../validationSchema/user.schema.js";
import Prisma from "../../prisma.js";
import { hashPass } from "../../helpers/hashPassword.js";
import { mailHelper } from '../../services/mailHelper.js'
import { uploadSingle } from "../../services/uploadservice.js";
import { sanitizeData } from "../../helpers/sanitizeData.js";
import Jwt from "jsonwebtoken"


const createAccount = asyncHandler(async (req, res) => {
  // input validation
  const { error } = userschemaforCreateAccount.validate(req.body);
  // if we git error
  if (error) throw new CustomError(error.message, 401, "stack line 28");
  // hashing password
  const hashedPass = await hashPass(req.body.password)
  // upload image on cloudnairy
  // const result = await uploadSingle(req,res) // will be uncomented later
  //senitize incoming data
  const senitizeData = sanitizeData(req.body); // avatar url will be added after frontend implementation
  // checking user existance in db records
  const DoseExists = await CheckUserExists(senitizeData.email);
  if (DoseExists) throw new CustomError("user already registerd", 401);

  // call create user funcation
  const createdUser = await createUserInDatabase(senitizeData, hashedPass);
  // generate and  set token
  //for saftey
  createdUser.password = undefined;
  // send verification email to user 
  const verificationEmail = await sendVerificationEmail(createdUser, req)


  res.status(201).json({
    success: true,
    verified: verificationEmail.accepted
  })


});

// create/register user in database
const createUserInDatabase = async (userData, hashedPassword) => {
  const createdUser = await Prisma.user.create({
    data: { ...userData, password: hashedPassword },
  });

  if (!createdUser) {
    throw new CustomError(
      "User cannot be created",
      500,
      "user controller create account stack line 41"
    );
  }

  return createdUser;
};

// check dose user exits in db records
const CheckUserExists = async (email) => {
  const DoseExists = await Prisma.user.findUnique({
    where: { email: email },
  });

  return DoseExists;
};



const sendVerificationEmail = async (userInfo, req) => {

  // generating one verification jwt token 
  const emailVerificatioToken = Jwt.sign(userInfo, process.env.EMAIL_VERIFICATION_SECRET, { expiresIn: "10m" })


  // if failed to generate jwt token 
  if (!emailVerificatioToken) {
    throw new CustomError("trouble getting verification token", 401, "line 154 createAccount")

  }
  // strcturing email url 
  const emailVerificationUrl = `${req?.protocol}://${req?.get("host")}/api/v1/user/verify/${emailVerificatioToken}`
  const message = `your verfiy you account url us as folows  click on it and verify your account \n\n\n\n\ ${emailVerificationUrl}\n\n\n\n\   if this is not requseted by you please ignore`

  try {
    var mailResponce = await mailHelper({
      email: userInfo?.email,
      subject: "Account Verification request",
      text: message
    })
  } 
  
  catch (error) {
    throw new CustomError(error || "Email could not be sent", 500, error.stack)
  }

  return mailResponce

}





export {
  createAccount,
  createUserInDatabase,
  CheckUserExists,
  sanitizeData,
  sendVerificationEmail
};
