import  Jwt  from "jsonwebtoken"


const generateAccessToken =   (data) => {
   console.log( "user in accesstoken -------------------" +data);
    return new Promise ( async (resolve , reject ) => {
  
         Jwt.sign( {data} , process.env.ACCESS_SECRET ,{expiresIn:"1h"} , async (err , token) => {
            if(err) {
            reject(err)
            }

            resolve(token)
        })
     
    })
}


const generateRefreshToken =   (data) => {
    console.log( "user in email refresh token -------------------" +data);
   
    return new Promise ( async (resolve , reject ) => {
  
         Jwt.sign( {data} , process.env.REFRESH_SECRET ,{expiresIn:"10days"} , async (err , token) => {
            if(err) {
            reject(err)
            }

            resolve(token)
        })
     
    })
}

const generateVerificationToken =   (data) => {

    console.log( "user in email emailverfication token -------------------" +data);

   
    return new Promise ( async (resolve , reject ) => {
  
         Jwt.sign( {data} , process.env.EMAIL_VERIFICATION_SECRET ,{expiresIn:"10m"} , async (err , token) => {
            if(err) {

            reject(err)
            }

            resolve(token)
        })
     
    })
}






export{
    generateAccessToken,
    generateRefreshToken,
    generateVerificationToken
}