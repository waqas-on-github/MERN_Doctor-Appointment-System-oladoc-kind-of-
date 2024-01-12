import sanitizeHtml from "sanitize-html";


//senitize data
const sanitizeData = (data) => {
    const sanitizedData = { ...data };
  
    Object.keys(sanitizedData).forEach((key) => {
      if (typeof sanitizedData[key] === "string") {
        sanitizedData[key] = sanitizeHtml(sanitizedData[key]);
      }
    });
  
    return sanitizedData;
  };


  export {
    sanitizeData
  }