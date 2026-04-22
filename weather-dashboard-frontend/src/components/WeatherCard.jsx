const WeatherCard = ({ data }) => {
  if (!data) return null;
  const { name, main, weather, wind } = data;
  return (
    <div className="glass p-6 w-full max-w-md mx-auto animate-fade-in-up">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">{name}</h2>
          <p className="text-5xl font-extrabold mt-2">{Math.round(main.temp)}°C</p>
          <p className="capitalize">{weather[0].description}</p>
        </div>
        <img src={`https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`} alt="weather icon" className="w-24 h-24 drop-shadow-lg" />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>💧 Humidity: {main.humidity}%</div>
        <div>🌬️ Wind: {wind.speed} m/s</div>
        <div>📈 Feels like: {Math.round(main.feels_like)}°C</div>
        <div>🔽 Min/Max: {Math.round(main.temp_min)}° / {Math.round(main.temp_max)}°</div>
      </div>
    </div>
  );
};
export default WeatherCard;