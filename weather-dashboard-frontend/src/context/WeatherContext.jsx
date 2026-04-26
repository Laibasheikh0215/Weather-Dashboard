import { createContext, useState, useContext } from 'react';
import api from '../services/api';

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

// temperature conversion helpers
const convertTemp = (temp, unit) => {
  if (unit === 'F') return (temp * 9/5) + 32;
  return temp;
};

export const WeatherProvider = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('C'); // 'C' or 'F'

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

  // helper for components to get displayed temperature
  const getDisplayTemp = (tempKelvin) => {
    const celsius = tempKelvin; // API returns Celsius already (units=metric)
    return unit === 'F' ? celsius * 9/5 + 32 : celsius;
  };

  return (
    <WeatherContext.Provider value={{
      currentWeather,
      forecast,
      loading,
      error,
      fetchWeather,
      unit,
      setUnit,
      getDisplayTemp
    }}>
      {children}
    </WeatherContext.Provider>
  );
};