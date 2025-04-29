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
      setForm({ name: '', email: '', password: '' }); // Clear form
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || 'Signup failed';
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
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
      <button onClick={handleSignup} disabled={loading}>
        {loading ? 'Signing up...' : 'Signup'}
      </button>
    </div>
  );
}
