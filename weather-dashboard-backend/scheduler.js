const cron = require('node-cron');
const { checkWeatherAndSendAlerts } = require('./services/weatherAlertService');


function startScheduler() {
  console.log('Starting weather alert scheduler...');
  
  cron.schedule('0 8,20 * * *', async () => {
    console.log(`[${new Date().toISOString()}] Running scheduled weather check...`);
    await checkWeatherAndSendAlerts();
  });
  
  console.log('Scheduler initialized. Weather alerts will run twice a day (8 AM & 8 PM).');
}

module.exports = startScheduler;