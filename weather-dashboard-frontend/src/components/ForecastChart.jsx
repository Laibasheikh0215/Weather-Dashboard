import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ForecastChart = ({ forecast }) => {
  if (!forecast) return null;
  // Har 8th item lo (3-hour intervals se daily forecast)
  const daily = forecast.list.filter((_, i) => i % 8 === 0).slice(0, 5);
  const data = daily.map(item => ({
    day: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
    temp: Math.round(item.main.temp),
  }));
  return (
    <div className="glass p-4 mt-6 w-full">
      <h3 className="text-xl font-semibold mb-2">5-Day Forecast</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="day" stroke="currentColor" />
          <YAxis stroke="currentColor" />
          <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none' }} />
          <Line type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastChart;