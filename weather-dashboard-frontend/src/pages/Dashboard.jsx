import { useState, useEffect } from 'react';
import { useWeather } from '../context/WeatherContext';
import { useAuth } from '../context/AuthContext';
import SearchBar from '../components/SearchBar';
import HourlyForecast from '../components/HourlyForecast';
import Highlights from '../components/Highlights';
import SavedLocations from '../components/SavedLocations';
import MapView from '../components/MapView';
import ThemeToggle from '../components/ThemeToggle';
import UserDropdown from '../components/UserDropdown';
import TempToggle from '../components/TempToggle';
import SunriseSunset from '../components/SunriseSunset';
import TomorrowInfo from '../components/TomorrowInfo';
import api from '../services/api';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { currentWeather, forecast, fetchWeather, loading, error, getDisplayTemp, unit } = useWeather();
  const { logout } = useAuth();
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  const handleSaveLocation = async () => {
    if (!currentWeather) return;
    await api.post('/locations', {
      cityName: currentWeather.name,
      lat: currentWeather.coord.lat,
      lon: currentWeather.coord.lon,
    });
    toast.success('Location saved');
  };

  const toggleAlerts = async () => {
    const newState = !alertsEnabled;
    const res = await api.put('/users/alerts', { enabled: newState });
    if (res.data.success) {
      setAlertsEnabled(newState);
      toast.success(`Email alerts ${newState ? 'enabled' : 'disabled'}`);
    }
  };

  const handleMapSelect = async (latlng) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`);
      const data = await res.json();
      const city = data.address?.city || data.address?.town || data.address?.village;
      if (city) fetchWeather(city);
      else toast.error('City not detected');
    } catch {
      toast.error('Map error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
            Weather Update Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <TempToggle />
            <ThemeToggle />
            <UserDropdown />
          </div>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content (left 2/3) */}
          <div className="lg:col-span-2 space-y-4">
            <SearchBar onSearch={fetchWeather} />
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-red-400 text-center">{error}</p>}
            {currentWeather && (
              <>
                {/* Current weather card */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-4xl font-bold">{currentWeather.name}</h2>
                      <p className="text-gray-300">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                      <div className="mt-4">
                        <p className="text-6xl font-extrabold">{Math.round(getDisplayTemp(currentWeather.main.temp))}°{unit}</p>
                        <p className="text-lg">
                          High: {Math.round(getDisplayTemp(currentWeather.main.temp_max))}° Low: {Math.round(getDisplayTemp(currentWeather.main.temp_min))}°
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <img src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} alt="weather icon" className="w-20 h-20" />
                      <p className="capitalize text-lg">{currentWeather.weather[0].description}</p>
                    </div>
                  </div>
                  <button onClick={handleSaveLocation} className="mt-4 text-sm glass px-4 py-2 rounded-full hover:bg-white/20 transition">
                    ⭐ Save this location
                  </button>
                </div>

                {/* Hourly forecast (only once) */}
                <HourlyForecast forecast={forecast} />

                {/* Sunrise/Sunset + Tomorrow info (two equal columns) */}
                {currentWeather && forecast && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <SunriseSunset weather={currentWeather} />
                    <TomorrowInfo forecast={forecast} />
                  </div>
                )}

                {/* Today highlights */}
                <Highlights weather={currentWeather} />
              </>
            )}
          </div>
          

          {/* Right sidebar – saved cities */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 h-fit">
            <SavedLocations onSelect={fetchWeather} showTemperatures />
          </div>
        </div>

        {/* World Map – bottom of the dashboard  */}
        <div className="mt-8">
          <MapView onSelectLocation={handleMapSelect} />
          <p className="text-center text-sm text-gray-300 mt-2">Click on map to get weather</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;