import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <Router>
      <nav style={{ padding: '10px', background: '#eee', marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
        {!loggedIn && (
          <>
            <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
        {loggedIn && (
          <>
            <Link to="/dashboard" style={{ marginRight: '10px' }}>Dashboard</Link>
            <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<h2>Welcome to Train Seat Reservation System</h2>} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={
          loggedIn ? <Dashboard /> : <Navigate to="/login" replace />
        } />
        <Route path="*" element={<h2>404 Not Found</h2>} />
      </Routes>
    </Router>
  );
}
