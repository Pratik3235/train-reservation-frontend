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
      setSeats(res.data.seats); // Access only the seats array
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
      fetchSeats(); // refresh seat data
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
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h3>Train Seat Reservation</h3>

      <button onClick={initSeats} disabled={initLoading} style={{ marginBottom: '15px', padding: '8px 16px', backgroundColor: '#555', color: 'white', border: 'none', borderRadius: '5px' }}>
        {initLoading ? 'Resetting...' : '🔄 Reset Train Seats'}
      </button>

      <br />
      <label>Select number of seats (1–7): </label>
      <input
        type="number"
        min="1"
        max="7"
        value={selectedCount}
        onChange={e => setSelectedCount(Number(e.target.value))}
        style={{ margin: '0 10px', padding: '5px', width: '50px' }}
      />
      <button onClick={bookSeats} disabled={bookingLoading}>
        {bookingLoading ? 'Booking...' : 'Book'}
      </button>

      <hr />

      {loading ? (
        <p>Loading seats...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 40px)', gap: '5px', marginTop: '20px' }}>
          {seats.map(seat => (
            <div
              key={seat.seatNumber}
              style={{
                backgroundColor: seat.isBooked ? 'red' : 'lightgreen',
                padding: '10px',
                textAlign: 'center',
                borderRadius: '5px',
                fontWeight: 'bold',
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
