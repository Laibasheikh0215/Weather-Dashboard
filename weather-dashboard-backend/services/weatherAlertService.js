const mongoose = require('mongoose');
const SavedLocation = require('../models/SavedLocation');
const User = require('../models/User');
const { sendWeatherAlert } = require('./emailService');
const axios = require('axios');

// Weather condition thresholds
const THRESHOLDS = {
  temp: { min: -5, max: 40 },
  wind: 15,
  rain: 'Rain',
  storm: 'Thunderstorm'
};

function getAlertReason(weather) {
 
  if (weather.condition.includes('Thunderstorm')) return '⚡ Severe Thunderstorm Warning!';
  if (weather.condition.includes('Rain')) return '🌧️ Heavy Rainfall Alert';
  if (weather.temp >= 40) return '🔥 Extreme Heat Warning';
  if (weather.temp <= -5) return '❄️ Extreme Cold Warning';
  if (weather.windSpeed >= 15) return '💨 High Wind Warning';
  return null;
  
}

async function checkWeatherAndSendAlerts() {
  console.log('Running weather alert check...');
  
  const locations = await SavedLocation.find().populate('userId', 'email emailAlertsEnabled');
  
  if (locations.length === 0) {
    console.log('No saved locations found.');
    return;
  }

  let alertCount = 0;
  const alertsSent = {};

  for (const location of locations) {
    const user = location.userId;
    if (!user) {
      console.log('Location has no associated user:', location._id);
      continue;
    }
    
    console.log(`User: ${user.email}, Alerts enabled: ${user.emailAlertsEnabled}`);
    
    if (!user.emailAlertsEnabled) {
      console.log(`Alerts disabled for user ${user.email}`);
      continue;
    }
    
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location.cityName)}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
      );
      const weatherData = response.data;
      
      const weather = {
        temp: Math.round(weatherData.main.temp),
        condition: weatherData.weather[0].main,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed
      };
      
      const alertReason = getAlertReason(weather);
      
      if (alertReason) {
        const alertKey = `${user._id}-${location._id}`;
        if (!alertsSent[alertKey]) {
          await sendWeatherAlert(user.email, location.cityName, weather, alertReason);
          alertCount++;
          alertsSent[alertKey] = true;
          console.log(`✅ Alert sent for ${location.cityName} to ${user.email} (${weather.condition}, ${weather.temp}°C)`);
        }
      }
    } catch (error) {
      console.error(`Failed to fetch weather for ${location.cityName}:`, error.message);
    }
  }
  
  console.log(`Weather alert check completed. ${alertCount} alerts sent.`);
}

module.exports = { checkWeatherAndSendAlerts };  