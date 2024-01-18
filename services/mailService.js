  import nodemailer from "nodemailer" 

  var transporter = nodemailer.createTransport({
    host: "smtp.mailmug.net",
    port: 2525,
    auth: {
      user: "xmvparbxbwj3c4ga",
      pass: "verszreqjpahvpae"
    }
  });
  
    export {
      transporter
    }