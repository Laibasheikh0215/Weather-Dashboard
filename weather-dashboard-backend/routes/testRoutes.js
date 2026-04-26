const express = require('express');
const { checkWeatherAndSendAlerts } = require('../services/weatherAlertService');
const router = express.Router();

router.get('/test-alerts', async (req, res) => {
  try {
    await checkWeatherAndSendAlerts();
    res.json({ message: 'Alert check completed. Check terminal logs and email inbox.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;