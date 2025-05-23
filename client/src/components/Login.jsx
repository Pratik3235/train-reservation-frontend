import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    padding: "2rem",
  },
  card: {
    maxWidth: "400px",
    width: "100%",
    backgroundColor: "#ffffff",
    padding: "2.5rem",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
    marginBottom: "0.25rem",
  },
  subText: {
    textAlign: "center",
    fontSize: "0.9rem",
    color: "#6b7280",
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "0.9rem",
    color: "#374151",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "0.95rem",
    marginBottom: "1.25rem",
    outline: "none",
  },
  errorBox: {
    color: "#dc2626",
    backgroundColor: "#fef2f2",
    borderRadius: "6px",
    textAlign: "center",
    padding: "0.75rem",
    fontSize: "0.875rem",
    marginBottom: "1rem",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    background: "linear-gradient(to right, #22c55e, #16a34a)",
    color: "#ffffff",
    fontSize: "1rem",
    fontWeight: "600",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  buttonHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 15px rgba(34, 197, 94, 0.3)",
  },
  registerText: {
    textAlign: "center",
    fontSize: "0.875rem",
    marginTop: "1rem",
    color: "#6b7280",
  },
  registerLink: {
    color: "#2563eb",
    fontWeight: "500",
    marginLeft: "4px",
    textDecoration: "none",
  },
};

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [hover, setHover] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://train-reservation-backend-er3f.onrender.com/users/login", // 🔧 updated URL
        formData
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        navigate("/book-ticket");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Welcome Back</h2>
        <p style={styles.subText}>Sign in to your account</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" style={styles.label}>
            Email address
          </label>
          <input
            style={styles.input}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input
            style={styles.input}
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && <div style={styles.errorBox}>{error}</div>}

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(hover ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Login
          </button>
        </form>

        <div style={styles.registerText}>
          Don't have an account?
          <Link to="/register" style={styles.registerLink}>
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
