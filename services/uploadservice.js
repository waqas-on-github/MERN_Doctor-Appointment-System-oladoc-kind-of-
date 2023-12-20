import cloudnairyConfig from "../config/cloudnairyConfig";
import fs from "node:fs/promises";
import CustomError from "../utils/CustomError";

const cloudinary = cloudnairyConfig();

const options = {
  overwrite: true,
};


const uploadSingle = async (req, res) => {
  const file = req?.file;

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
