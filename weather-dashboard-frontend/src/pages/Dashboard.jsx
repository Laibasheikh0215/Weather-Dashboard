import { useWeather } from '../context/WeatherContext';
import { useAuth } from '../context/AuthContext';
import WeatherCard from '../components/WeatherCard';
import ForecastChart from '../components/ForecastChart';
import SearchBar from '../components/SearchBar';
import MapView from '../components/MapView';
import SavedLocations from '../components/SavedLocations';
import ThemeToggle from '../components/ThemeToggle';
import { LogOut } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { currentWeather, forecast, fetchWeather, loading, error } = useWeather();
  const { logout } = useAuth();

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

  const handleSaveLocation = async () => {
    if (!currentWeather) return;
    await api.post('/locations', {
      cityName: currentWeather.name,
      lat: currentWeather.coord.lat,
      lon: currentWeather.coord.lon,
    });
    toast.success('Location saved');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
            Weather Dashboard
          </h1>
          <div className="flex gap-3">
            <ThemeToggle />
            <button onClick={logout} className="p-2 rounded-full glass">
              <LogOut size={20} />
            </button>
          </div>
        </div>
        <SearchBar onSearch={fetchWeather} />
        {loading && <p className="text-center mt-4">Loading...</p>}
        {error && <p className="text-red-400 text-center mt-4">{error}</p>}
        {currentWeather && (
          <div className="mt-6 flex flex-col items-center">
            <WeatherCard data={currentWeather} />
            <button onClick={handleSaveLocation} className="mt-2 px-4 py-1 glass text-sm">
              ⭐ Save this location
            </button>
          </div>
        )}
        {forecast && <ForecastChart forecast={forecast} />}
        <div className="mt-8">
          <MapView onSelectLocation={handleMapSelect} />
          <p className="text-center text-sm text-gray-300 mt-2">Click on map to get weather</p>
        </div>
        <SavedLocations onSelect={fetchWeather} />
      </div>
    </div>
  );
};

export default Dashboard;