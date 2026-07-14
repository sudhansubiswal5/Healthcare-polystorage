import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getBeds } from "../api/hospitalApi";
import BedGrid from "./BedGrid";

function Dashboard() {
  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBeds = async () => {
    try {
      const data = await getBeds();
      setBeds(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBeds();
  }, []);

  if (loading) return <div className="p-10 text-center font-mono">Connecting...</div>;

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <nav className="w-64 bg-[#0f172a] text-white p-6 shadow-xl">
        <h2 className="text-xl font-bold mb-10">Polystore Med</h2>
        <ul className="space-y-6">
          <li className="text-blue-400 font-medium">Dashboard</li>
          <li className="hover:text-blue-300"><Link to="/appointments">Appointments</Link></li>
          <li className="pt-10 text-red-400 cursor-pointer text-sm" 
              onClick={() => { localStorage.clear(); navigate("/login"); }}>
            Logout
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Bed Management</h1>
          <button onClick={fetchBeds} className="border px-4 py-1 rounded text-sm hover:bg-gray-50">Refresh</button>
        </div>

        <div className="border-2 border-dashed border-gray-100 rounded-xl p-20 text-center">
          {beds.length > 0 ? (
            <BedGrid beds={beds} onUpdate={fetchBeds} />
          ) : (
            <p className="text-gray-400 text-sm">No beds found in MongoDB Atlas.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;