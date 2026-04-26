const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('⚠️ Email credentials missing – email alerts disabled');
    return null;
  }
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  return transporter;
}

async function sendWeatherAlert(to, cityName, weather, alertReason) {
  console.log(`Preparing email to: ${to}`); // ← debug log
  
  const trans = getTransporter();
  if (!trans) {
    console.error('❌ No transporter – email not sent');
    return;
  }

  const mailOptions = {
    from: `"Weather Alert" <${process.env.EMAIL_USER}>`,
    to: to,   // ✅ must be a valid email string
    subject: `⚠️ Weather Alert for ${cityName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2>⚠️ Weather Alert!</h2>
        <p><strong>Location:</strong> ${cityName}</p>
        <p><strong>Alert:</strong> ${alertReason}</p>
        <div style="background-color: #f0f0f0; padding: 15px; border-radius: 8px;">
          <p><strong>🌡️ Temperature:</strong> ${weather.temp}°C</p>
          <p><strong>☁️ Condition:</strong> ${weather.condition}</p>
          <p><strong>💧 Humidity:</strong> ${weather.humidity}%</p>
          <p><strong>💨 Wind Speed:</strong> ${weather.windSpeed} m/s</p>
        </div>
        <p>Stay safe!</p>
      </div>
    `,
  };

  try {
    const info = await trans.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}: ${info.messageId}`);
  } catch (err) {
    console.error(`❌ Email failed: ${err.message}`);
  }
}

module.exports = { sendWeatherAlert };