import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear error before trying

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        setError("❌ No token received from server");
      }
    } catch (err: any) {
      console.error("❌ Login error:", err.response?.data || err.message);
      const message =
        err.response?.data?.message || "❌ Invalid email or password";
      setError(message);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #FFDEE9, #B5FFFC)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: "linear-gradient(to bottom, #ffffff, #f9f9f9)",
          padding: "2.5rem",
          borderRadius: "15px",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2)",
          width: "100%",
          maxWidth: "420px",
          border: "3px solid #38B2AC",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1.8rem",
            fontSize: "1.8rem",
            color: "#2B6CB0",
          }}
        >
          🎨 Welcome Back!
        </h2>

        {error && (
          <div
            style={{
              backgroundColor: "#FED7D7",
              color: "#C53030",
              padding: "0.75rem",
              borderRadius: "6px",
              marginBottom: "1rem",
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <div style={{ marginBottom: "1.2rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              color: "#4A5568",
              fontWeight: 600,
            }}
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.65rem",
              borderRadius: "10px",
              border: "2px solid #CBD5E0",
              fontSize: "1rem",
              outlineColor: "#63B3ED",
              background: "#F7FAFC",
            }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              color: "#4A5568",
              fontWeight: 600,
            }}
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.65rem",
              borderRadius: "10px",
              border: "2px solid #CBD5E0",
              fontSize: "1rem",
              outlineColor: "#F687B3",
              background: "#F7FAFC",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.75rem",
            background: "linear-gradient(to right, #667EEA, #764BA2)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontWeight: 600,
            fontSize: "1.1rem",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          🚀 Login
        </button>
      </form>
    </div>
  );
};

export default Login;
