const { sendOTPEmail } = require('../services/emailService');

const otps = {}; 

exports.requestOTP = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  otps[email] = otp;

  try {
    await sendOTPEmail(email, otp);
    res.status(200).json({ message: 'OTP sent!' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Email failed to send' });
  }
};

exports.verifyOTP = (req, res) => {
  const { email, otp } = req.body;
  if (otps[email] == otp) {
    delete otps[email];
    res.status(200).json({ message: 'Auth successful' });
  } else {
    res.status(401).json({ message: 'Invalid OTP' });
  }
};