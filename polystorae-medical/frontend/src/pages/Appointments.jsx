import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ doctorName: "", reason: "", bedId: "" });
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/hospital/appointments");
      setAppointments(Array.isArray(res.data) ? res.data : []);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/hospital/book-bed", {
        ...formData,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
      });
      alert("✅ Booked Successfully!");
      setShowForm(false);
      fetchData(); 
    } catch (err) { alert("Error: " + (err.response?.data?.message || err.message)); }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div className="flex h-screen bg-slate-50">
      <nav className="w-64 bg-slate-900 text-white p-6 shadow-xl">
        <h2 className="text-xl font-bold mb-10">Polystore Med</h2>
        <ul className="space-y-4">
          <li className="hover:text-blue-300"><Link to="/dashboard">Dashboard</Link></li>
          <li className="text-blue-400 font-bold underline">Appointments</li>
          <li className="pt-10 text-red-400 cursor-pointer text-sm" onClick={() => {localStorage.clear(); navigate("/login");}}>Logout</li>
        </ul>
      </nav>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Appointments</h1>
          <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">
            {showForm ? "Close Form" : "+ New Appointment"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleBook} className="bg-white p-6 rounded-2xl shadow-md mb-8 border border-blue-100 max-w-2xl">
            <h3 className="text-lg font-bold mb-4 text-blue-800">New Booking</h3>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Doctor Name" required className="p-3 border rounded-lg outline-none" onChange={(e) => setFormData({...formData, doctorName: e.target.value})} />
              <input type="text" placeholder="Bed ID (101, 102...)" required className="p-3 border rounded-lg outline-none" onChange={(e) => setFormData({...formData, bedId: e.target.value})} />
              <input type="text" placeholder="Reason" required className="p-3 border rounded-lg col-span-2 outline-none" onChange={(e) => setFormData({...formData, reason: e.target.value})} />
            </div>
            <button type="submit" className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg font-bold">Confirm Booking</button>
          </form>
        )}

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="p-4 text-slate-600">Bed</th>
                <th className="p-4 text-slate-600">Doctor</th>
                <th className="p-4 text-slate-600">Time</th>
                <th className="p-4 text-slate-600">Reason</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((app) => (
                <tr key={app._id} className="border-b hover:bg-slate-50">
                  <td className="p-4 font-mono text-blue-600">{app.bedId}</td>
                  <td className="p-4 font-medium">{app.doctorName}</td>
                  <td className="p-4 text-slate-500 text-sm">{app.date} | {app.time}</td>
                  <td className="p-4">{app.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Appointments;