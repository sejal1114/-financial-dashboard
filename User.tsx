import React from "react";

const User: React.FC = () => {
  return (
    <div style={{ padding: "2rem", backgroundColor: "#f7fafc", minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "2rem",
          borderRadius: "1rem",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          textAlign: "center",
        }}
      >
        <img
          src="https://i.pravatar.cc/150?img=8" // Random avatar generator
          alt="Profile"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "1rem",
            border: "4px solid #3182ce",
          }}
        />
        <h2 style={{ marginBottom: "0.5rem", fontSize: "1.8rem", color: "#2D3748" }}>Sejal Mehta</h2>
        <p style={{ fontSize: "1rem", color: "#4A5568" }}>Finance Manager</p>

        <div style={{ marginTop: "2rem", textAlign: "left" }}>
          <h3 style={{ color: "#2B6CB0", marginBottom: "1rem" }}>Contact Information</h3>
          <p><strong>Email:</strong> sejal@example.com</p>
          <p><strong>Phone:</strong> +91 9876543210</p>
        </div>
      </div>
    </div>
  );
};

export default User;
