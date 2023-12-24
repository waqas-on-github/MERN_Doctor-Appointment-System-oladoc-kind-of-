import nodemailer from "nodemailer" 

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

export {
    transporter
}