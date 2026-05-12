const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((err) => {
  console.log("[Email]: Connected");
})

const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verification Code',
    text: `Your OTP is ${otp}`,
  };
  console.log(mailOptions);
  await transporter.sendMail(mailOptions);
};

module.exports = { sendOTPEmail, transporter };