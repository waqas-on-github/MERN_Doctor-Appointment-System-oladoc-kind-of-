import Prisma from "../../prisma.js"
import CustomError from "../../utils/CustomError.js"
import asyncHandler from "../../utils/asyncHandler.js"
import JWT from "jsonwebtoken"

const verifyEmail = asyncHandler(async (req, res) => {

    const { token } = req.params

    const verify = JWT.verify(token, process.env.EMAIL_VERIFICATION_SECRET)
    // if user not verified 
    if (!verify) throw new CustomError("failed to verify user", 401)
    // if success to verified update field in database 
    if (verify) {

        var verifiedUser = await Prisma.user.update({
            where: {
                id: verify.id
            },
            data: { isVerfied: true }
        })
    }

    res.status(200).json({
        success: true,
        verified: verifiedUser
    })

})









export {
    verifyEmail
}