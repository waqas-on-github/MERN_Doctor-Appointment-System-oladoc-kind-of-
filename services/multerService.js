import multer from "multer";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/my-uploads-medtech')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ 
    storage: storage ,
    
    fileFilter: (req, file, cb) => {
      // Allow only specific file types
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Invalid file type"), false);
      }
    },
})


  export {
      upload
  }