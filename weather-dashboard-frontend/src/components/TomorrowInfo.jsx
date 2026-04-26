import { useWeather } from '../context/WeatherContext';

const TomorrowInfo = ({ forecast }) => {
  const { getDisplayTemp, unit } = useWeather();
  
  // Early return if forecast is missing or has no list
  if (!forecast || !forecast.list || forecast.list.length < 16) {
    return null;
  }

  const tomorrowItems = forecast.list.slice(8, 16);
  if (tomorrowItems.length === 0) return null;

  const maxTemp = Math.max(...tomorrowItems.map(item => item.main.temp));

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex justify-center items-center">
      <div className="text-center">
        <p className="text-gray-300">Tomorrow</p>
        <p className="text-3xl font-bold">{Math.round(getDisplayTemp(maxTemp))}°{unit}</p>
      </div>
    </div>
  );
};

export default TomorrowInfo;