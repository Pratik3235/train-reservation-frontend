import React from 'react';
import API from '../api';

export default function InitSeatsButton() {
  const handleInit = async () => {
    if (!window.confirm("⚠️ This will reset all seat bookings. Do you want to continue?")) return;

    try {
      const res = await API.post('/seat/init');
      alert(res.data.message || "Seats initialized");
    } catch (err) {
      console.error("Seat initialization failed:", err.response?.data || err.message);
      alert("Seat initialization failed");
    }
  };

  const buttonStyle = {
    margin: "20px auto",
    padding: "12px 24px",
    backgroundColor: "#2563EB", // Tailwind blue-600
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "block",
    transition: "background-color 0.3s ease",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  };

  const hoverStyle = {
    backgroundColor: "#1D4ED8", // Tailwind blue-700
  };

  return (
    <button
      onClick={handleInit}
      style={buttonStyle}
      onMouseOver={(e) => (e.target.style.backgroundColor = hoverStyle.backgroundColor)}
      onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
    >
      🔄 Reset Train Seats
    </button>
  );
}
