import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TOTAL_SEATS = 80;
const API_URL = "https://train-reservation-backend-er3f.onrender.com/bookTicket";

const BookTicket = () => {
  const navigate = useNavigate();
  const [bookedSeats, setBookedSeats] = useState(() => {
    const savedSeats = localStorage.getItem("bookedSeats");
    return savedSeats ? JSON.parse(savedSeats) : [];
  });
  const [numToBook, setNumToBook] = useState("");
  const [justBooked, setJustBooked] = useState([]);

  useEffect(() => {
    fetchBookedSeats();
  }, []);

  useEffect(() => {
    localStorage.setItem("bookedSeats", JSON.stringify(bookedSeats));
  }, [bookedSeats]);

  const fetchBookedSeats = async () => {
    try {
      const response = await axios.get(`${API_URL}/seats`);
      const booked = response.data.filter((seat) => seat.isBooked).map((seat) => seat.seatNumber);
      if (booked.length > 0) {
        setBookedSeats(booked);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleBook = async () => {
    const num = +numToBook;
    if (isNaN(num) || num < 1 || num > 7) {
      toast.warn("Please enter a valid number between 1 and 7");
      return;
    }

    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.post(`${API_URL}/book`, { userId, numberOfSeats: num });

      if (response.status === 200) {
        const booked = response.data.seats.map((seat) => seat.seatNumber);
        setJustBooked(booked);
        setBookedSeats((prev) => [...prev, ...booked]);
        setNumToBook("");
        toast.success("Seats booked successfully!");
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Booking failed. Please try again.");
    }
  };

  const handleReset = async () => {
    try {
      await axios.post(`${API_URL}/reset`);
      setBookedSeats([]);
      setJustBooked([]);
      setNumToBook("");
      localStorage.removeItem("bookedSeats");
      toast.success("Booking reset successful");
    } catch (error) {
      toast.error("Failed to reset bookings", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const allBookedSeats = bookedSeats;

  // STYLE OBJECTS
  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#f3f4f6",
      padding: "16px",
      fontFamily: "sans-serif",
    },
    wrapper: {
      maxWidth: "1000px",
      margin: "0 auto",
    },
    header: {
      textAlign: "center",
      marginBottom: "32px",
    },
    title: {
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "4px",
    },
    subtitle: {
      color: "#4B5563",
      fontSize: "14px",
    },
    logoutBtn: {
      padding: "6px 12px",
      backgroundColor: "#EF4444",
      color: "#fff",
      borderRadius: "4px",
      fontSize: "14px",
      border: "none",
      cursor: "pointer",
    },
    layout: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "32px",
    },
    coachBox: {
      backgroundColor: "#fff",
      padding: "24px",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      width: "100%",
      maxWidth: "500px",
    },
    seatRow: {
      display: "flex",
      justifyContent: "center",
      gap: "8px",
    },
    seat: (isBooked) => ({
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "4px",
      backgroundColor: isBooked ? "#F97316" : "#22C55E",
      color: "#fff",
      fontWeight: "bold",
    }),
    legendRow: {
      display: "flex",
      justifyContent: "center",
      gap: "24px",
      marginTop: "16px",
      fontSize: "14px",
    },
    legend: {
      display: "flex",
      alignItems: "center",
    },
    legendBox: (color) => ({
      width: "16px",
      height: "16px",
      backgroundColor: color,
      borderRadius: "4px",
      marginRight: "8px",
    }),
    bookingBox: {
      backgroundColor: "#fff",
      padding: "24px",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      width: "100%",
      maxWidth: "300px",
    },
    sectionTitle: {
      fontSize: "20px",
      fontWeight: "600",
      borderBottom: "1px solid #e5e7eb",
      paddingBottom: "8px",
      marginBottom: "16px",
      textAlign: "center",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #d1d5db",
      borderRadius: "4px",
      outline: "none",
      marginTop: "4px",
      fontSize: "14px",
    },
    btn: {
      width: "100%",
      padding: "10px",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      cursor: "pointer",
    },
    bookBtn: {
      backgroundColor: "#3B82F6",
      color: "#fff",
      marginTop: "12px",
    },
    resetBtn: {
      backgroundColor: "#fff",
      color: "#EF4444",
      border: "1px solid #EF4444",
      marginTop: "8px",
    },
    bookedSeatsContainer: {
      backgroundColor: "#f3f4f6",
      padding: "12px",
      borderRadius: "6px",
      marginTop: "12px",
    },
    bookedSeat: {
      backgroundColor: "#F97316",
      color: "#fff",
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "12px",
      margin: "2px",
    },
  };

  return (
    <div style={styles.container}>
      <ToastContainer position="top-center" autoClose={3000} />
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>Train Seat Booking</h1>
          <p style={styles.subtitle}>Simple and easy train seat reservation system</p>
          <div style={{ marginTop: "16px" }}>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </div>
        </div>

        <div style={styles.layout}>
          <div style={styles.coachBox}>
            <h2 style={styles.sectionTitle}>Train Coach</h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {Array.from({ length: Math.ceil(TOTAL_SEATS / 7) }).map((_, row) => {
                  const startSeat = row * 7 + 1;
                  const endSeat = Math.min(startSeat + 6, TOTAL_SEATS);
                  return (
                    <div key={row} style={styles.seatRow}>
                      {Array.from({ length: endSeat - startSeat + 1 }).map((_, col) => {
                        const seatNumber = startSeat + col;
                        const isBooked = allBookedSeats.includes(seatNumber);
                        return (
                          <div key={seatNumber} style={styles.seat(isBooked)}>
                            {seatNumber}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={styles.legendRow}>
              <div style={styles.legend}>
                <div style={styles.legendBox("#22C55E")}></div>
                <span>Available</span>
              </div>
              <div style={styles.legend}>
                <div style={styles.legendBox("#F97316")}></div>
                <span>Booked</span>
              </div>
            </div>
          </div>

          <div style={styles.bookingBox}>
            <h2 style={styles.sectionTitle}>Booking Information</h2>
            <div style={{ textAlign: "center" }}>
              <p><strong>Available Seats:</strong> {TOTAL_SEATS - bookedSeats.length}</p>
              <p><strong>Booked Seats:</strong> {bookedSeats.length}</p>
              <p><strong>Max Seats Selection:</strong> 7</p>

              {justBooked.length > 0 && (
                <div style={styles.bookedSeatsContainer}>
                  <p style={{ fontWeight: "bold", marginBottom: "6px" }}>Your Booked Seats:</p>
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    {justBooked.map((seat) => (
                      <span key={seat} style={styles.bookedSeat}>{seat}</span>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ textAlign: "left", marginTop: "12px" }}>
                <label style={{ fontSize: "14px", fontWeight: "500" }}>
                  Enter number of seats
                </label>
                <input
                  type="number"
                  min="1"
                  max="7"
                  value={numToBook}
                  onChange={(e) => setNumToBook(e.target.value)}
                  style={styles.input}
                />
              </div>

              <button onClick={handleBook} style={{ ...styles.btn, ...styles.bookBtn }}>
                Book Seats
              </button>
              <button onClick={handleReset} style={{ ...styles.btn, ...styles.resetBtn }}>
                Reset Bookings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTicket;
