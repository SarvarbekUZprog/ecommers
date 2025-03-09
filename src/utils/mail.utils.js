const nodemailer = require("nodemailer");
const { EMAIL_HOST_USER, EMAIL_HOST_PASSWORD } = require('../data/config');
console.log(EMAIL_HOST_PASSWORD, EMAIL_HOST_USER);

/*
@param {to}
@param {subject} string
@param {text} string
@param {html} string
@return {boolean} 
*/
const sendMail = async (to, subject, text, html) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: String(process.env.EMAIL_HOST_USER),
      pass: String(process.env.EMAIL_HOST_PASSWORD),
    },
  });

  // email options
  const mailOptions = {
    from: process.env.EMAIL_HOST_USER, // sender email
    to,
    subject,
    text,
    html,
  };

  try {
    // send email
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Send email err: ", error);
    return false;
  }
};

module.exports = sendMail;
