import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments'; // ✅ 1. ADD THIS IMPORT

const Home = () => (
  <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
    <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-100 text-center max-w-md">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Medical Polystore</h1>
      <p className="text-slate-600 mb-6">System is online. Ready for Patient Auth.</p>
      <div className="flex gap-4 justify-center">
        <Link to="/login" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Login
        </Link>
        <Link to="/register" className="px-6 py-2 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 transition-colors">
          Register
        </Link>
      </div>
    </div>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        {/* ✅ 2. ADD THIS ROUTE: This allows the Appointments page to load */}
        <Route 
          path="/appointments" 
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          } 
        />

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;