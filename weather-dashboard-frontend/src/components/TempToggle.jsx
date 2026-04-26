import { useWeather } from '../context/WeatherContext';

const TempToggle = () => {
  const { unit, setUnit } = useWeather();

  return (
    <div className="flex items-center gap-1 glass p-1 rounded-full">
      <button
        onClick={() => setUnit('C')}
        className={`px-3 py-1 rounded-full transition ${unit === 'C' ? 'bg-white/30' : 'hover:bg-white/10'}`}
      >
        °C
      </button>
      <button
        onClick={() => setUnit('F')}
        className={`px-3 py-1 rounded-full transition ${unit === 'F' ? 'bg-white/30' : 'hover:bg-white/10'}`}
      >
        °F
      </button>
    </div>
  );
};

export default TempToggle;