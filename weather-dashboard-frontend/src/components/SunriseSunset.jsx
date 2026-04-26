import { Sunrise, Sunset } from 'lucide-react';

const SunriseSunset = ({ weather }) => {
  if (!weather || !weather.sys) {
    return null;
  }

  const sunrise = new Date(weather.sys.sunrise * 1000);
  const sunset = new Date(weather.sys.sunset * 1000);
  const dayLengthMs = sunset - sunrise;
  const hours = Math.floor(dayLengthMs / (1000 * 60 * 60));
  const minutes = Math.floor((dayLengthMs % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <Sunrise size={28} className="text-orange-400" />
          <div>
            <p className="text-sm text-gray-300">Sunrise</p>
            <p className="text-lg font-semibold">
              {sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Sunset size={28} className="text-orange-400" />
          <div>
            <p className="text-sm text-gray-300">Sunset</p>
            <p className="text-lg font-semibold">
              {sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
        <div className="col-span-2 flex justify-between items-center border-t border-white/20 pt-3 mt-1">
          <span className="text-gray-300">Length of day</span>
          <span className="text-xl font-bold">{hours}h {minutes}m</span>
        </div>
      </div>
    </div>
  );
};

export default SunriseSunset;