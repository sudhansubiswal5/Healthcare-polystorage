import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/auth/register', formData);
      alert(response.data.message);
      navigate('/login');
    } catch (err) {
      alert("Registration Failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl shadow-xl w-96 border border-slate-200">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-6 text-center">Join Polystore</h2>
        
        <input 
          type="text" placeholder="Full Name" required
          className="w-full p-3 mb-4 border rounded-lg outline-none"
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />

        <input 
          type="email" placeholder="Email Address" required
          className="w-full p-3 mb-4 border rounded-lg outline-none"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />

        <input 
          type="password" placeholder="Password" required
          className="w-full p-3 mb-6 border rounded-lg outline-none"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />

        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Register;