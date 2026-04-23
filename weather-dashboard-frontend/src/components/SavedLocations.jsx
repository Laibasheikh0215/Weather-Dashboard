import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Star, Trash2, Cloud, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

const SavedLocations = ({ onSelect }) => {
  const { user } = useAuth();
  const [locations, setLocations] = useState([]);
  const [icons, setIcons] = useState({});
  const [loadingIcons, setLoadingIcons] = useState({});

  useEffect(() => {
    if (user) fetchLocations();
  }, [user]);

  const fetchLocations = async () => {
    try {
      const { data } = await api.get('/locations');
      setLocations(data);
      // Fetch icons for each location
      for (const loc of data) {
        await fetchIcon(loc);
      }
    } catch (err) {
      console.error('Fetch locations error:', err);
      toast.error('Could not load saved locations');
    }
  };

  const fetchIcon = async (loc) => {
    setLoadingIcons(prev => ({ ...prev, [loc._id]: true }));
    try {
      const res = await api.get(`/weather/current?city=${encodeURIComponent(loc.cityName)}`);
      if (res.data && res.data.weather && res.data.weather[0]) {
        const iconCode = res.data.weather[0].icon;
        setIcons(prev => ({ ...prev, [loc._id]: iconCode }));
        console.log(`Icon for ${loc.cityName}: ${iconCode}`); // Debug log
      } else {
        console.warn(`No weather data for ${loc.cityName}`);
      }
    } catch (err) {
      console.error(`Failed to fetch icon for ${loc.cityName}:`, err.response?.status, err.message);
    } finally {
      setLoadingIcons(prev => ({ ...prev, [loc._id]: false }));
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

  return (
    <div className="glass p-4 mt-6">
      <h3 className="text-xl font-semibold flex items-center gap-2">
        <Star size={18} /> Saved Locations
      </h3>
      {locations.length === 0 && (
        <p className="text-gray-400 mt-2">No saved locations yet.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
        {locations.map((loc) => (
          <div
            key={loc._id}
            className="flex justify-between items-center bg-white/5 p-2 rounded-lg hover:bg-white/10"
          >
            <button
              onClick={() => onSelect(loc.cityName)}
              className="flex items-center gap-2 hover:underline flex-1 text-left"
            >
              {loadingIcons[loc._id] ? (
                <Loader size={16} className="animate-spin text-white" />
              ) : icons[loc._id] ? (
                <img
                  src={`https://openweathermap.org/img/wn/${icons[loc._id]}.png`}
                  alt="weather"
                  className="w-6 h-6"
                />
              ) : (
                <Cloud size={16} className="text-gray-400" />
              )}
              <span>{loc.customName || loc.cityName}</span>
            </button>
            <button
              onClick={() => deleteLocation(loc._id)}
              className="text-red-400 hover:text-red-300 p-1"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedLocations;