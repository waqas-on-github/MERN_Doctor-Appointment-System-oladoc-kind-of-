  import nodemailer from "nodemailer" 

  
  
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "example@brevo.com", // generated ethereal user
      pass: "xxxxxxxxx", // generated ethereal password
    },
  });
  
    export {
      transporter
    }