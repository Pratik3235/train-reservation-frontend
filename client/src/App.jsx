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

  const navStyle = {
    padding: '15px 30px',
    background: '#1e293b',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    fontFamily: 'Arial, sans-serif'
  };

  const linkStyle = {
    marginRight: '20px',
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
  };

  const buttonStyle = {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  return (
    <Router>
      <nav style={navStyle}>
        <div>
          <Link to="/" style={linkStyle}>Home</Link>
          {!loggedIn && (
            <>
              <Link to="/login" style={linkStyle}>Login</Link>
              <Link to="/signup" style={linkStyle}>Signup</Link>
            </>
          )}
          {loggedIn && (
            <>
              <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
            </>
          )}
        </div>
        {loggedIn && (
          <button onClick={handleLogout} style={buttonStyle}>Logout</button>
        )}
      </nav>

      <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
        <Routes>
          <Route path="/" element={<h2>🚄 Welcome to Train Seat Reservation System</h2>} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={loggedIn ? <Dashboard /> : <Navigate to="/login" replace />} />
          <Route path="*" element={<h2>❌ 404 - Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}
