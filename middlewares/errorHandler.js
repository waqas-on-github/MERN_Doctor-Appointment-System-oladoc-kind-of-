import CustomError from "../utils/CustomError.js";
import { MulterError } from "multer";

const errorHandler = (err, req, res, next) => {
  console.error('Error message:', err.message); // Log the error message
  
  if (err instanceof CustomError) {
    // do acc to custom error  
    console.log(err);
    return res.status(500).json({
      sucess: false,
      error: err.message,
    });
  }

  if (err) {
    if (
      err.name === "PrismaClientKnownRequestError" || 
      err.name === "NotFoundError"
      
      ) {
      return res.status(500).json({
        success: false,
        err:  "prisma error",
        message: err.message,
        stack :  err.stack
      });
    }
     
    if (err instanceof MulterError) {
      res.status(400).json({ 
        success : false ,
        message: "File upload error by multer" ,
        error : err.message,
        stack : err.stack
       });
        
    }
    // console.log(err.stack);
    return res.status(err.code || 500).json({
      sucess: false,
      error: err.message,
      stack: err.stack,
    });
  }
};

export { errorHandler };