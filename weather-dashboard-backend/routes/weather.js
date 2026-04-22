const express = require('express');
const { getCurrentWeather, getForecast } = require('../controllers/weatherController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/current', auth, getCurrentWeather);
router.get('/forecast', auth, getForecast);

module.exports = router;