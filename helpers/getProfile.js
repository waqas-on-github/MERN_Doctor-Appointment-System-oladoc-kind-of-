import Prisma from "../prisma.js"

const getOneUser = async (userId) => { 

    const user = await Prisma.user.findUnique({
       where : {id :userId}
    }) 
   
    if(!user) throw new CustomError("can not find user " , 401 , "line 9 getoneuser helper")
   
    return user
   
   
   }
   
   export {
    getOneUser
   }