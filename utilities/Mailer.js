require('dotenv').config()
const nodemailer = require("nodemailer");
const config = require('../config')

async function main(toEmail,data) {
  let transporter = nodemailer.createTransport({
    host: config.mail.host,
    port: config.mail.port,
    secure: true,
    auth: {
      user: config.mail.username,
      pass: config.mail.password
    },
  });
  let info = await transporter.sendMail({
    from: `${config.mail.from_name} <${config.mail.from}>`, //'"The Contract Master" <azeemdeveloper222@gmail.com>'
    to: toEmail,
    subject: data.subject,
    html: data.body,
  });
}

const sendMail = (toEmail, data) => {
    main(toEmail,data).catch(console.error);
}

module.exports = sendMail