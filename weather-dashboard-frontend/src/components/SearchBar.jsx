import { useState } from 'react';
import { Search } from 'lucide-react';
import VoiceSearchButton from './VoiceSearchButton';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) onSearch(city.trim());
  };

  const handleVoiceDetected = (spokenCity) => {
    setCity(spokenCity);
    onSearch(spokenCity);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md mx-auto gap-2">
      <input
        type="text"
        placeholder="Enter city name or speak..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 px-4 py-2 rounded-full glass focus:outline-none"
      />
      <VoiceSearchButton onCityDetected={handleVoiceDetected} />
      <button type="submit" className="p-2 rounded-full glass hover:bg-white/20 transition">
        <Search size={20} />
      </button>
    </form>
  );
};

export default SearchBar;