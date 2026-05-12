const express = require("express");
const jwt = require("jsonwebtoken");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const { transporter } = require("./services/emailService.js");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("FindJob Backend is running!");
});

app.use("/api/auth", authRoutes);

app.use("/api/jobs", async (req, res, next) => {
  const headers = req.headers;
  const auth = headers["authorization"] || headers["Authorization"];

  const token = auth.split(' ')[1];

  console.log(token);

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    console.log(data);
    // req.user = data;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}, jobRoutes);

module.exports = app;
