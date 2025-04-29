import React from 'react';
import API from '../api'; 

export default function InitSeatsButton() {
  const handleInit = async () => {
    if (!window.confirm("This will reset all seat bookings. Continue?")) return;

    try {
      const res = await API.post('/seat/init');
      alert(res.data.message || "Seats initialized");
    } catch (err) {
      console.error("Seat initialization failed:", err.response?.data || err.message);
      alert("Seat initialization failed");
    }
  };

  return (
    <button 
      onClick={handleInit} 
      style={{
        margin: "10px 0",
        padding: "10px 20px",
        backgroundColor: "#1976d2",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
      }}
    >
      🔄 Reset Train Seats
    </button>
  );
}
