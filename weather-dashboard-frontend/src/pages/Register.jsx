import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
// Import your background image (same image or different)
import bgImage from '../assets/background image.jpg';   // <- adjust path & extension

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
      await register(name, email, password); 
      toast.success('Registered!'); 
      navigate('/dashboard'); 
    } catch { 
      toast.error('Registration failed'); 
    }
  };
  
  return (
    <div 
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Optional dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50 -z-10"></div>
      
      <form onSubmit={handleSubmit} className="relative z-10 glass p-8 w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="w-full p-2 rounded bg-black/20" 
          required 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-2 rounded bg-black/20" 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full p-2 rounded bg-black/20" 
          required 
        />
        <button type="submit" className="w-full py-2 bg-yellow-500 rounded hover:bg-yellow-600">
          Register
        </button>
        <p className="text-center">
          Already have account? <Link to="/login" className="underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;