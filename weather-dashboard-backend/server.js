const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables FIRST
dotenv.config();

console.log('EMAIL_USER present?', !!process.env.EMAIL_USER);
console.log('MONGO_URI present?', !!process.env.MONGO_URI);

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/weather', require('./routes/weather'));
app.use('/api/locations', require('./routes/locations'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(require('./middleware/errorHandler'));

// Test email endpoint (optional)
app.get('/test-email', async (req, res) => {
  try {
    const { sendWeatherAlert } = require('./services/emailService');
    await sendWeatherAlert('slaiba25@gmail.com', 'Test City', 
      { temp: 25, condition: 'Clear', humidity: 50, windSpeed: 5 }, 
      'Test Message');
    res.send('Email sent check inbox/spam');
  } catch (err) {
    res.status(500).send('Email failed: ' + err.message);
  }
});

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
    
    const startScheduler = require('./scheduler');
    startScheduler();
    
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  });