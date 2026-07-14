import React from 'react';
import axiosInstance from "../api/axiosInstance"; // 👈 Path check: up one level to api/

function BedGrid({ beds, onUpdate }) {
  const handleBooking = async (bedId, bedNum) => {
    if (!window.confirm(`Confirm booking for Bed ${bedNum}?`)) return;

    try {
      // Direct call to bypass the hospitalApi export error
      await axiosInstance.post("/hospital/book-bed", {
        bedId,
        doctorName: "Staff On-Call",
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reason: "Emergency Allocation"
      });
      
      alert("✅ Bed Booked Successfully!");
      if (onUpdate) onUpdate(); 
    } catch (err) {
      alert("❌ Booking failed: " + (err.response?.data?.message || err.message));
    }
  };

  // ... rest of your mapping code

  if (!beds || beds.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {beds.map((bed) => (
        <div 
          key={bed._id} 
          onClick={() => bed.status === 'available' && handleBooking(bed._id, bed.bedNumber || bed.bedNum)}
          className={`p-5 border-2 rounded-xl transition-all ${
            bed.status === 'available' 
            ? 'border-green-100 hover:border-green-500 cursor-pointer bg-white' 
            : 'border-red-100 bg-gray-50 grayscale opacity-60'
          }`}
        >
          <p className="font-bold text-lg text-slate-700">Bed {bed.bedNumber || bed.bedNum}</p>
          <p className={`text-xs font-bold uppercase ${bed.status === 'available' ? 'text-green-600' : 'text-red-500'}`}>
            {bed.status}
          </p>
        </div>
      ))}
    </div>
  );
}

export default BedGrid;