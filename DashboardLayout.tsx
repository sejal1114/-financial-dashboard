import React from "react";
import Sidebar from "../components/Sidebar";
import OverviewChart from "../components/OverviewChart"; // adjust path if needed
 import PieChartComponent from "../components/PieChartComponent"; // ✅ correct for default export

// Example transactions array (replace with your actual data source)
const transactions = [
  { category: "Food", amount: 500, date: "2024-06-01" },
  { category: "Transport", amount: 200, date: "2024-06-02" },
  { category: "Shopping", amount: 1500, date: "2024-06-03" },
  { category: "Bills", amount: 800, date: "2024-06-04" },
  { category: "Entertainment", amount: 300, date: "2024-06-05" },
  { category: "Other", amount: 100, date: "2024-06-06" },
];

const recentTransactions = transactions.slice(-5).reverse(); // or use your filtered array
console.log(recentTransactions); // Debug: check if it's logging anything


<div style={{ padding: "2rem" }}>
  {/* Tabs */}
  <div>...your balance/revenue tabs...</div>

  {/* Overview Chart */}
  <div style={{ marginTop: "2rem" }}>
    <OverviewChart />
  </div>

  {/* Other dashboard content */}
</div>

const sidebarWidth = 213;

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      {/* Fixed Header */}
      <header
        style={{
          width: "100%",
          height: "75px",
          backgroundColor: "#EDF2F7",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2rem",
          borderBottom: "1px solid #CBD5E0",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#2D3748" }}>📘 Dashboard</h1>
        <input
          type="text"
          placeholder="Search transactions..."
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "1px solid #CBD5E0",
            fontSize: "14px",
            width: "250px",
          }}
        />
      </header>

      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area (pushed right by sidebar + below header) */}
      <div
        style={{
          marginLeft: `${sidebarWidth}px`,
          marginTop: "75px", // height of the header
        }}
      >
        {/* Tabs */}
        <div
          style={{
            padding: "1rem 2rem",
            backgroundColor: "#F7FAFC",
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #E2E8F0",
          }}
        >
          {[
            { label: "💰 Balance", value: "₹45,000" },
            { label: "📈 Revenue", value: "₹18,000" },
            { label: "📉 Expenses", value: "₹9,000" },
            { label: "🏦 Savings", value: "₹10,000" },
          ].map((item) => (
            <div key={item.label} style={{ textAlign: "center" }}>
              <p style={{ fontWeight: "500", fontSize: "16px", color: "#4A5568" }}>{item.label}</p>
              <p style={{ fontWeight: "700", fontSize: "20px", color: "#2D3748" }}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* Dashboard Content (e.g., charts, tables) */}
        <main style={{ padding: "2rem" }}>
          {children}
        </main>
      </div>
    </div>
  );
};
<div style={{ display: "flex", gap: "1.5rem", marginTop: "2rem" }}>
  {/* Pie Chart Card */}
  <div
    style={{
      flex: 1,
      backgroundColor: "#4A5568",
      padding: "1rem",
      borderRadius: "8px",
      minHeight: "300px",
    }}
  >
    <h3 style={{ color: "white", marginBottom: "1rem" }}>📊 Category Distribution</h3>
    <PieChartComponent data={[]} />
  </div>

  {/* Recent Transactions Card */}
  <div
    style={{
      flex: 1,
      backgroundColor: "#4A5568",
      padding: "1rem",
      borderRadius: "8px",
      minHeight: "300px",
      overflowY: "auto",
    }}
  >
    <h3 style={{ color: "white", marginBottom: "1rem" }}>🧾 Recent Transactions</h3>
    {[
      { category: "Food", amount: 500, date: "2024-06-01" },
      { category: "Transport", amount: 200, date: "2024-06-02" },
      { category: "Shopping", amount: 1500, date: "2024-06-03" },
    ].map((tx, index) => (
      <div key={index} style={{ marginBottom: "0.5rem", color: "white" }}>
        <strong>{tx.category}</strong> - ₹{tx.amount} on {tx.date}
      </div>
    ))}
  </div>
</div>

export default DashboardLayout;
