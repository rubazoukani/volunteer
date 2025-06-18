const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: process.env.MAIL_MESSAGE_HOST,
  port: process.env.MAIL_MESSAGE_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_MESSAGE_EMAIL,
    pass: process.env.MAIL_MESSAGE_PASS,
  },
});

const sendVerificationCode = async (email, code) => {
  try {
    await transporter.sendMail({
      from: "System",
      to: email,
      subject: "Email Verification",
      html: `Please use the following verification code to complete your email verification: ${code}`
      ,
    });
  } catch (err) {
    console.log("err", err);
  }
};

const rejectOrganization = async (email, name, message) => {
  try {
    await transporter.sendMail({
      from: "System",
      to: email,
      subject: "Organization Rejected",
      html: `<p>Your organization <strong>${name}</strong> has been rejected.</p><p>Reason: ${message}</p>`,
    });
  } catch (err) {
    console.log("Email error:", err);
  }

}

module.exports = { sendVerificationCode, rejectOrganization }