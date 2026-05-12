require('dotenv').config();
const app = require('./app');
const { transporter } = require('./services/emailService');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('DB Error:', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});