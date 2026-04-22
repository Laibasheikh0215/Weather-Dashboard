import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">⛅ WeatherHub</h1>
          <ThemeToggle />
        </div>
        <div className="flex flex-col items-center justify-center mt-32 text-center">
          <h2 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-500">
            Weather, Elevated
          </h2>
          <p className="mt-4 text-xl max-w-md text-gray-200">
            Real-time forecasts, interactive maps, and personalized saved locations.
          </p>
          <div className="mt-8 flex gap-4">
            <Link to="/login" className="px-6 py-3 glass rounded-full hover:scale-105 transition">
              Login
            </Link>
            <Link to="/register" className="px-6 py-3 bg-white/20 rounded-full hover:bg-white/30 transition">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;