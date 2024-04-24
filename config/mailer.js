const nodemailer = require('nodemailer');
exports.sendmail = nodemailer.createTransport({
  sendmail: true,
  path: 'C:/laragon/bin/sendmail/sendmail.exe'
});


exports.smtp = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_ENCRYPTION, // upgrade later with STARTTLS
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});
