import { useState } from 'react';
import API from '../api';

export default function Login({ setLoggedIn }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const { email, password } = form;

    // Basic validation
    if (!email || !password) {
      return alert('Please enter both email and password');
    }

    setLoading(true);
    try {
      const res = await API.post('/auth/login', form);

      localStorage.setItem('token', res.data.accessToken);
      setLoggedIn(true);
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
}
