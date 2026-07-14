import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // To prevent double clicks
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("🚀 Attempting login for:", email);

    try {
      // ✅ 127.0.0.1 is more reliable on Linux/Ubuntu than 'localhost'
      const response = await axios.post('http://127.0.0.1:5000/api/auth/login', 
        { email, password },
        { 
          headers: { 'Content-Type': 'application/json' },
          timeout: 5000 // Stop 'Pending' after 5 seconds
        }
      );

      // ✅ Store token for ProtectedRoute
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log("✅ Token saved to LocalStorage");
        navigate('/dashboard');
      } else {
        alert('Login succeeded but no token received.');
      }
      
    } catch (err) {
      console.error("❌ Full Login Error:", err);
      
      if (err.code === 'ECONNABORTED') {
        alert('Server timed out. Check if your backend crashed.');
      } else if (err.response) {
        // Server responded with an error (400, 401, 500)
        alert('Login Failed: ' + (err.response.data.message || 'Invalid Credentials'));
      } else if (err.request) {
        // Request made but no response (The 'Pending' issue)
        alert('No response from server. Run: sudo fuser -k 5000/tcp and restart your backend.');
      } else {
        alert('Error: ' + err.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
      <form 
        onSubmit={handleLogin} 
        className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border border-slate-100"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black text-slate-800 mb-2">Patient Login</h2>
          <p className="text-slate-500 font-medium italic">Polystore Medical Secure Access</p>
        </div>
        
        <div className="mb-5">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
          <input 
            type="email" 
            placeholder="admin@test.com" 
            required
            autoComplete="email"
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-8">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            required
            autoComplete="current-password"
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button 
          disabled={isSubmitting}
          className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95 flex justify-center items-center ${
            isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
          }`}
        >
          {isSubmitting ? 'Verifying Auth...' : 'Sign In'}
        </button>
        
        <div className="mt-8 text-center border-t pt-6 border-slate-100">
          <p className="text-sm text-slate-500 font-medium">
            Don't have an account? 
            <span 
              onClick={() => navigate('/register')} 
              className="ml-2 text-blue-600 cursor-pointer font-bold hover:underline"
            >
              Register Here
            </span>
          </p>
        </div>
      </form>

      {/* Diagnostic Footer */}
      <div className="mt-6 text-[10px] text-slate-400 font-mono">
        Status: Backend should be on 127.0.0.1:5000
      </div>
    </div>
  );
};

export default Login;