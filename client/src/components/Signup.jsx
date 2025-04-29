import { useState } from 'react';
import API from '../api';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    const { name, email, password } = form;

    if (!name || !email || !password) {
      return alert('Please fill all fields');
    }

    setLoading(true);
    try {
      const res = await API.post('/auth/signup', form);
      alert(res.data.message); // "Signup Successful"
      setForm({ name: '', email: '', password: '' });
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || 'Signup failed';
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    maxWidth: '400px',
    margin: '60px auto',
    padding: '30px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px'
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#047857',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '16px'
  };

  const buttonDisabledStyle = {
    ...buttonStyle,
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed'
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Signup</h2>
      <input
        style={inputStyle}
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        style={inputStyle}
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input
        style={inputStyle}
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <button
        style={loading ? buttonDisabledStyle : buttonStyle}
        onClick={handleSignup}
        disabled={loading}
      >
        {loading ? 'Signing up...' : 'Signup'}
      </button>
    </div>
  );
}
