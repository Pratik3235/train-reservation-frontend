import { useEffect, useState } from 'react';
import API from '../api';

export default function SeatGrid() {
  const [seats, setSeats] = useState([]);
  const [selectedCount, setSelectedCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(false);

  const fetchSeats = async () => {
    try {
      const res = await API.get('/seat/all');
      setSeats(res.data.seats);
    } catch (err) {
      console.error('Failed to fetch seats:', err);
      alert('Error fetching seat data');
    } finally {
      setLoading(false);
    }
  };

  const bookSeats = async () => {
    if (selectedCount < 1 || selectedCount > 7) {
      alert('Please select between 1 and 7 seats');
      return;
    }

    setBookingLoading(true);
    try {
      const res = await API.post('/booking/book', { count: selectedCount });
      alert(`Booked seats: ${res.data.seats.join(', ')}`);
      fetchSeats();
    } catch (err) {
      console.error('Booking failed:', err.response?.data || err.message);
      const message = err.response?.data?.message || 'Booking failed';
      alert(message);
    } finally {
      setBookingLoading(false);
    }
  };

  const initSeats = async () => {
    if (!window.confirm("This will reset all seat bookings. Continue?")) return;
    setInitLoading(true);
    try {
      const res = await API.post('/seat/init');
      alert(res.data.message || "Seats initialized successfully");
      fetchSeats();
    } catch (err) {
      console.error('Initialization failed:', err.response?.data || err.message);
      alert('Seat initialization failed');
    } finally {
      setInitLoading(false);
    }
  };

  useEffect(() => {
    fetchSeats();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🚆 Train Seat Reservation</h2>

      <div style={styles.controls}>
        <button onClick={initSeats} disabled={initLoading} style={styles.resetBtn}>
          {initLoading ? 'Resetting...' : '🔄 Reset Seats'}
        </button>

        <div style={styles.selectWrapper}>
          <label style={styles.label}>Seats to Book (1–7):</label>
          <input
            type="number"
            min="1"
            max="7"
            value={selectedCount}
            onChange={e => setSelectedCount(Number(e.target.value))}
            style={styles.input}
          />
          <button onClick={bookSeats} disabled={bookingLoading} style={styles.bookBtn}>
            {bookingLoading ? 'Booking...' : '✅ Book'}
          </button>
        </div>
      </div>

      <hr style={{ margin: '20px 0' }} />

      {loading ? (
        <p>Loading seats...</p>
      ) : (
        <div style={styles.grid}>
          {seats.map(seat => (
            <div
              key={seat.seatNumber}
              style={{
                ...styles.seat,
                backgroundColor: seat.isBooked ? '#EF4444' : '#34D399',
                cursor: seat.isBooked ? 'not-allowed' : 'pointer'
              }}
              title={seat.isBooked ? 'Booked' : 'Available'}
            >
              {seat.seatNumber}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#F3F4F6',
    fontFamily: 'Segoe UI, sans-serif',
    boxShadow: '0 6px 16px rgba(0,0,0,0.1)'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '25px',
    color: '#1F2937'
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    alignItems: 'center'
  },
  resetBtn: {
    padding: '8px 16px',
    backgroundColor: '#6B7280',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  selectWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  label: {
    fontWeight: '500'
  },
  input: {
    width: '60px',
    padding: '6px',
    borderRadius: '5px',
    border: '1px solid #D1D5DB'
  },
  bookBtn: {
    padding: '8px 14px',
    backgroundColor: '#2563EB',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '10px',
    marginTop: '20px'
  },
  seat: {
    padding: '15px',
    textAlign: 'center',
    borderRadius: '6px',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px'
  }
};
