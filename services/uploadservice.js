import cloudnairyConfig from "../config/cloudnairyConfig.js";
import fs from "node:fs/promises";
import CustomError from "../utils/CustomError.js";

const cloudinary = cloudnairyConfig();

const options = {
  overwrite: true,
  
  transformation: {
    strip: true, // Remove all metadata
  }
};


const uploadSingle = async (req, res) => {
  const file = req?.file;
    console.log(file);
  if (!file || !file.path) {
    throw new CustomError("Invalid file or file path", 400, "upload service line 15");
  }

  try {
    const result = await cloudinary.uploader.upload(file.path, options);
    return result;
  } catch (error) {
    return error;
  } finally {
    try {
      await fs.unlink(file.path);
    } catch (error) {
      throw new CustomError(
        "file/image not deleted",
        401,
        "uppload service line 21"
      );
    }
  }
};

 export { uploadSingle };
