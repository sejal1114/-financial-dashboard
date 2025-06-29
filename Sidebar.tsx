import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Transactions", path: "/transactions" },
    { label: "Recent Transactions", path: "/recent-transactions" }, // ✅ Added
    { label: "Analytics", path: "/analytics" },
    { label: "Settings", path: "/settings" },
    { label: "Logout", path: "/logout" },
  ];

  return (
    <div
      style={{
        width: "213px",
        height: "100vh",
        position: "fixed",
        top: "75px", // below header
        left: 0,
        backgroundColor: "#2D3748", // dark blue
        color: "white",
        padding: "1rem",
        zIndex: 99,
        overflowY: "auto",
      }}
    >
      <h2 style={{ marginBottom: "1.5rem", fontSize: "20px" }}>Menu</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {menuItems.map((item) => (
          <li key={item.label} style={{ marginBottom: "1rem" }}>
            <Link
              to={item.path}
              style={{
                display: "block",
                padding: "0.5rem 1rem",
                backgroundColor:
                  location.pathname === item.path ? "#718096" : "#4A5568",
                borderRadius: "8px",
                color: "white",
                textDecoration: "none",
                transition: "background 0.3s",
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
