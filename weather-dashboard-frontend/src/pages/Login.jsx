import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
// import ThreeBackground from '../components/3d/ThreeBackground';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try { await login(email, password); toast.success('Logged in'); navigate('/dashboard'); } 
    catch { toast.error('Invalid credentials'); }
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* <ThreeBackground /> */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-slate-900 to-slate-800"></div>
      <form onSubmit={handleSubmit} className="relative z-10 glass p-8 w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 rounded bg-black/20" required />
        <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 rounded bg-black/20" required />
        <button type="submit" className="w-full py-2 bg-yellow-500 rounded hover:bg-yellow-600">Login</button>
        <p className="text-center">No account? <Link to="/register" className="underline">Register</Link></p>
      </form>
    </div>
  );
};
export default Login;