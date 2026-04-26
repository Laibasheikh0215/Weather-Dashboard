import { Droplet, Wind, Sun, CloudRain } from 'lucide-react';

const Highlights = ({ weather }) => {
  if (!weather) return null;
  const { main, wind } = weather;
  const uvIndex = 5; // placeholder
  const chanceOfRain = weather.rain ? weather.rain['1h'] || 0 : 0;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mt-4">
      <h3 className="text-lg font-semibold mb-3">Today's Highlights</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center">
          <CloudRain size={24} className="text-blue-400" />
          <p className="text-sm mt-1">Chance of Rain</p>
          <p className="text-xl font-bold">{chanceOfRain}%</p>
        </div>
        <div className="flex flex-col items-center">
          <Sun size={24} className="text-yellow-400" />
          <p className="text-sm mt-1">UV Index</p>
          <p className="text-xl font-bold">{uvIndex}</p>
        </div>
        <div className="flex flex-col items-center">
          <Wind size={24} className="text-gray-400" />
          <p className="text-sm mt-1">Wind Status</p>
          <p className="text-xl font-bold">{wind.speed} m/s</p>
        </div>
        <div className="flex flex-col items-center">
          <Droplet size={24} className="text-blue-400" />
          <p className="text-sm mt-1">Humidity</p>
          <p className="text-xl font-bold">{main.humidity}%</p>
        </div>
      </div>
    </div>
  );
};

export default Highlights;