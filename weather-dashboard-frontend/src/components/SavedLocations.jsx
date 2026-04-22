import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Star, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const SavedLocations = ({ onSelect }) => {
  const { user } = useAuth();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (user) fetchLocations();
  }, [user]);

  const fetchLocations = async () => {
    const { data } = await api.get('/locations');
    setLocations(data);
  };

  const deleteLocation = async (id) => {
    await api.delete(`/locations/${id}`);
    fetchLocations();
    toast.success('Removed');
  };

  return (
    <div className="glass p-4 mt-6">
      <h3 className="text-xl font-semibold flex items-center gap-2"><Star size={18} /> Saved Locations</h3>
      {locations.length === 0 && <p className="text-gray-400 mt-2">No saved locations yet.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
        {locations.map(loc => (
          <div key={loc._id} className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
            <button onClick={() => onSelect(loc.cityName)} className="hover:underline">
              {loc.customName || loc.cityName}
            </button>
            <button onClick={() => deleteLocation(loc._id)} className="text-red-400">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SavedLocations;