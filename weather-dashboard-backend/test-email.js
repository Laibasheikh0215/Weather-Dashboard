require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmail() {
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASS (length):', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Weather App" <${process.env.EMAIL_USER}>`,
      to: 'slaiba25@gmail.com',
      subject: 'Test Email from Weather App',
      text: 'If you receive this, email is working!',
      html: '<b>If you receive this, email is working!</b>',
    });
    console.log('Email sent:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

testEmail();