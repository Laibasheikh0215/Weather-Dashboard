import { createContext, useState, useContext } from 'react';
import api from '../services/api';

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/weather/current?city=${city}`);
      setCurrentWeather(data);
      const { data: forecastData } = await api.get(`/weather/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}`);
      setForecast(forecastData);
    } catch (err) {
      setError('City not found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider value={{ currentWeather, forecast, loading, error, fetchWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};