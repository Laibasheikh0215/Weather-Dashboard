import { useWeather } from '../context/WeatherContext';

const TomorrowTemp = ({ forecast }) => {
  if (!forecast) return null;
  // forecast.list contains 3‑hour intervals for 5 days.
  // Tomorrow's data starts at index 8 (since today's next 24h = 8 items).
  const tomorrowItems = forecast.list.slice(8, 16);
  if (tomorrowItems.length === 0) return null;
  const maxTemp = Math.max(...tomorrowItems.map(item => item.main.temp));
  const { getDisplayTemp, unit } = useWeather();
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mt-4">
      <div className="flex justify-between items-center">
        <span className="text-gray-300">Tomorrow</span>
        <span className="text-2xl font-bold">{Math.round(getDisplayTemp(maxTemp))}°{unit}</span>
      </div>
    </div>
  );
};

export default TomorrowTemp;