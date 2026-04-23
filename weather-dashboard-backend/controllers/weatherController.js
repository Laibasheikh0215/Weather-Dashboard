const { fetchWeather, fetchForecast } = require('../utils/weatherAPI');

exports.getCurrentWeather = async (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ message: 'City required' });
  try {
    const data = await fetchWeather(city);
    res.json(data);
  } catch (err) {
    console.error('Weather API error:', err.message);
    res.status(500).json({ message: err.message || 'Weather service error' });
  }
};

exports.getForecast = async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ message: 'Lat/Lon required' });
  try {
    const data = await fetchForecast(lat, lon);
    res.json(data);
  } catch (err) {
    console.error('Forecast API error:', err.message);
    res.status(500).json({ message: err.message || 'Forecast service error' });
  }
};