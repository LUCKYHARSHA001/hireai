const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const user = require("../models/user");

router.post("/request-otp", authController.requestOTP);
router.post("/verify-otp", authController.verifyOTP);

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Harsha is god");

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    console.log(token);

    res.status(200).json({
      token,
      email: user.email,
      message: "Login Successful",
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/sign-in", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "User Already Existed",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    console.log("user Created");
    // return res.redirect("/login");
    return res.status(201).json("Created Successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
