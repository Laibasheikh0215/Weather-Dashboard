import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Trash2, Loader, Cloud } from 'lucide-react';
import toast from 'react-hot-toast';
import { useWeather } from '../context/WeatherContext';

const SavedLocations = ({ onSelect }) => {
  const { user } = useAuth();
  const { getDisplayTemp, unit } = useWeather();
  const [locations, setLocations] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState({});

  useEffect(() => {
    if (user) fetchLocations();
  }, [user]);

  const fetchLocations = async () => {
    try {
      const { data } = await api.get('/locations');
      setLocations(data);
      data.forEach(loc => fetchWeatherForLocation(loc));
    } catch (err) {
      console.error('Failed to fetch locations', err);
    }
  };

  const fetchWeatherForLocation = async (loc) => {
    setLoading(prev => ({ ...prev, [loc._id]: true }));
    try {
      const res = await api.get(`/weather/current?city=${encodeURIComponent(loc.cityName)}`);
      if (res.data) {
        setWeatherData(prev => ({
          ...prev,
          [loc._id]: {
            temp: res.data.main.temp,
            temp_min: res.data.main.temp_min,
            temp_max: res.data.main.temp_max,
            icon: res.data.weather[0].icon,
          },
        }));
      }
    } catch (err) {
      console.error(`Failed to fetch weather for ${loc.cityName}`, err);
    } finally {
      setLoading(prev => ({ ...prev, [loc._id]: false }));
    }
  };

  const deleteLocation = async (id) => {
    try {
      await api.delete(`/locations/${id}`);
      setLocations(locations.filter(l => l._id !== id));
      toast.success('Removed');
    } catch (err) {
      toast.error('Failed to remove');
    }
  };

  const getIconUrl = (iconCode) => `https://openweathermap.org/img/wn/${iconCode}.png`;

  return (
    <div>
      <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
        <span>Other Cities</span>
      </h3>
      {locations.length === 0 && (
        <p className="text-gray-400 text-center">No saved locations yet.</p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
        {locations.map(loc => {
          const data = weatherData[loc._id];
          const isLoading = loading[loc._id];
          return (
            <div
              key={loc._id}
              className="bg-white/10 backdrop-blur-md rounded-xl p-3 relative hover:bg-white/20 transition cursor-pointer group"
              onClick={() => onSelect(loc.cityName)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteLocation(loc._id);
                }}
                className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 transition"
              >
                <Trash2 size={14} />
              </button>
              {isLoading ? (
                <div className="flex justify-center py-4">
                  <Loader size={20} className="animate-spin" />
                </div>
              ) : data ? (
                <>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-lg">{loc.customName || loc.cityName}</p>
                      <img src={getIconUrl(data.icon)} alt="weather" className="w-8 h-8 -mt-1" />
                    </div>
                    <p className="text-2xl font-bold">
                      {Math.round(getDisplayTemp(data.temp))}°{unit}
                    </p>
                  </div>
                  <div className="text-xs text-gray-300 mt-2">
                    H: {Math.round(getDisplayTemp(data.temp_max))}° L: {Math.round(getDisplayTemp(data.temp_min))}°
                  </div>
                </>
              ) : (
                <div className="flex justify-center py-4">
                  <Cloud size={20} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SavedLocations;