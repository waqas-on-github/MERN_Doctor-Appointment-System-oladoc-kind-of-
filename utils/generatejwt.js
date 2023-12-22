import  Jwt  from "jsonwebtoken"


const generateAccessToken =   (data) => {
   console.log( "udrt in auth middleware -------------------" +data);
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
   
    return new Promise ( async (resolve , reject ) => {
  
         Jwt.sign( {data} , process.env.REFRESH_SECRET ,{expiresIn:"240h"} , async (err , token) => {
            if(err) {
            reject(err)
            }

            resolve(token)
        })
     
    })
}





export{
    generateAccessToken,
    generateRefreshToken
}