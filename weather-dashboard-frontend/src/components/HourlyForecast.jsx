import { useWeather } from '../context/WeatherContext';

const HourlyForecast = ({ forecast }) => {
  const { getDisplayTemp, unit } = useWeather();
  if (!forecast || !forecast.list) return null;

  // Take next 8 entries (24 hours)
  const hourly = forecast.list.slice(0, 8);
  const now = new Date();
  const currentHour = now.getHours();

  // Helper to format hour (12‑hour format with AM/PM)
  const formatHour = (timestamp) => {
    const date = new Date(timestamp * 1000);
    let hour = date.getHours();
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour} ${ampm}`;
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mt-4">
      <h3 className="text-lg font-semibold mb-3">Today / Week</h3>
      <div className="overflow-x-auto custom-scrollbar pb-2">
        <div className="flex gap-6 min-w-max">
          {hourly.map((item, idx) => {
            const hourLabel = formatHour(item.dt);
            const iconCode = item.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
            const temp = Math.round(getDisplayTemp(item.main.temp));
            return (
              <div key={idx} className="text-center min-w-[70px]">
                <p className="text-sm font-medium">{hourLabel}</p>
                <img src={iconUrl} alt="weather" className="w-10 h-10 mx-auto my-1" />
                <p className="text-xl font-bold">{temp}°{unit}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;