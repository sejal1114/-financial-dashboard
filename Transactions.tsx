import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import PieChartComponent from "../components/PieChartComponent";


import BarChartComponent from "../components/BarChartComponent";

import {
  Transaction,
  categoryColors,
  convertToCSV,
  downloadCSV,
  thStyle,
  tdStyle
} from "../utils";

// ...all your existing imports and code above remain the same


const Transactions = () => {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filtered, setFiltered] = useState<Transaction[]>([]);
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Transaction | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(res.data);
        setFiltered(res.data);
      } catch (err) {
        setError("❌ Failed to fetch transactions");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let result = [...transactions];

    if (category !== "All") {
      result = result.filter((t) => t.category === category);
    }

    if (status !== "All") {
      result = result.filter((t) => t.status === status);
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      result = result.filter((t) => {
        const d = new Date(t.date);
        return d >= start && d <= end;
      });
    }

    if (search.trim() !== "") {
      const lowerSearch = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.user.toLowerCase().includes(lowerSearch) ||
          t.category.toLowerCase().includes(lowerSearch) ||
          t.status.toLowerCase().includes(lowerSearch)
      );
    }

    if (sortConfig.key) {
      result.sort((a, b) => {
        const key = sortConfig.key!;
        const direction = sortConfig.direction;

        if (key === "date") {
          const dateA = new Date(a[key]);
          const dateB = new Date(b[key]);
          return direction === "asc"
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime();
        }

        const aVal = a[key];
        const bVal = b[key];

        if (typeof aVal === "string" && typeof bVal === "string") {
          return direction === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }

        if (typeof aVal === "number" && typeof bVal === "number") {
          return direction === "asc" ? aVal - bVal : bVal - aVal;
        }

        return 0;
      });
    }

    setFiltered(result);
    setCurrentPage(1); // Reset to first page on filters change
  }, [transactions, category, status, startDate, endDate, search, sortConfig]);

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalAmount = filtered.reduce((sum, tx) => sum + tx.amount, 0);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const resetFilters = () => {
    setCategory("All");
    setStatus("All");
    setStartDate("");
    setEndDate("");
    setSearch("");
    setSortConfig({ key: null, direction: "asc" });
  };

  const requestSort = (key: keyof Transaction) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortArrow = (key: keyof Transaction) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? " ▲" : " ▼";
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Segoe UI, sans-serif" }}>
      <h2 style={{ color: "#2d3748", marginBottom: "0.5rem" }}>💰 Financial Dashboard</h2>

    

      {error && (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#fed7d7", // light red
      color: "#c53030", // dark red text
      padding: "0.75rem 1rem",
      borderRadius: "6px",
      marginBottom: "1rem",
      fontWeight: 500,
    }}
  >
    <span>❌ {error}</span>
    <button
      onClick={() => setError("")}
      style={{
        background: "none",
        border: "none",
        color: "#c53030",
        fontWeight: "bold",
        fontSize: "1.2rem",
        cursor: "pointer",
        marginLeft: "1rem",
      }}
      aria-label="Close alert"
    >
      ×
    </button>
  </div>
)}


      <div style={{ marginBottom: "1rem", color: "#4a5568" }}>
        Showing <strong>{filtered.length}</strong> of <strong>{transactions.length}</strong> transactions
      </div>

      <input
        type="text"
        placeholder="Search by user, category, or status..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "0.5rem",
          borderRadius: "6px",
          border: "1px solid #cbd5e0",
          marginBottom: "1rem",
          width: "100%",
          maxWidth: "400px",
          fontSize: "0.9rem",
        }}
      />

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center", marginBottom: "1.5rem", background: "#f7fafc", padding: "1rem", borderRadius: "8px" }}>
        
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: "0.5rem", borderRadius: "6px" }}>
          <option value="All">All Categories</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: "0.5rem", borderRadius: "6px" }}>
          <option value="All">All Statuses</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>

       
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ padding: "0.5rem", borderRadius: "6px" }} />

        <button onClick={resetFilters} style={{ backgroundColor: "#e53e3e", color: "white", border: "none", padding: "0.6rem 1rem", borderRadius: "6px", cursor: "pointer" }}>
          🔄 Reset
        </button>

        <button
          onClick={() => {
            const csv = convertToCSV(filtered);
            downloadCSV(csv);
          }}
          style={{ backgroundColor: "#3182ce", color: "white", border: "none", padding: "0.6rem 1rem", borderRadius: "6px", cursor: "pointer" }}
        >
          📥 Export CSV
        </button>
      </div>
      

      <PieChartComponent
        data={
          Object.entries(
            filtered.reduce<{ [category: string]: number }>((acc, tx) => {
              acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
              return acc;
            }, {})
          ).map(([name, value]) => ({ name, value }))
        }
      />
      <BarChartComponent
        data={Object.entries(
          filtered.reduce<{ [category: string]: number }>((acc, tx) => {
            acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
            return acc;
          }, {})
        ).map(([name, value]) => ({ name, value }))}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
  <div className="bg-white rounded-2xl shadow p-4">
    <h2 className="text-xl font-semibold mb-2">Spending Breakdown</h2>
    
  </div>
  <div className="bg-white rounded-2xl shadow p-4">
    <h2 className="text-xl font-semibold mb-2">Spending Trends</h2>
    
  </div>
</div>


      <div style={{ marginBottom: "1rem", fontWeight: 500 }}>
        Total Amount: <span style={{ color: "#2b6cb0" }}>₹{totalAmount.toFixed(2)}</span>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "#ffffff", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", borderRadius: "8px", overflow: "hidden" }}>
          <thead style={{ backgroundColor: "#edf2f7", color: "#4a5568" }}>
            <tr>
              <th style={thStyle} onClick={() => requestSort("date")}>Date{getSortArrow("date")}</th>
              <th style={thStyle} onClick={() => requestSort("amount")}>Amount{getSortArrow("amount")}</th>
              <th style={thStyle} onClick={() => requestSort("category")}>Category{getSortArrow("category")}</th>
              <th style={thStyle} onClick={() => requestSort("status")}>Status{getSortArrow("status")}</th>
              <th style={thStyle} onClick={() => requestSort("user")}>User{getSortArrow("user")}</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: "1rem", textAlign: "center", color: "#718096" }}>
                  No transactions found.
                </td>
              </tr>
            ) : (
              paginated.map((tx) => (
                <tr key={tx._id}>
                  <td style={tdStyle}>
                    {new Date(tx.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td style={tdStyle}>₹{tx.amount.toFixed(2)}</td>
                  <td style={{ ...tdStyle, color: categoryColors[tx.category] || "#000" }}>{tx.category}</td>
                  <td style={tdStyle}>{tx.status}</td>
                  <td style={tdStyle}>{tx.user}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{ padding: "0.5rem 1rem", borderRadius: "6px", backgroundColor: "#e2e8f0", border: "none" }}
        >
          ◀ Prev
        </button>

        <span style={{ lineHeight: "2rem" }}>Page {currentPage} of {totalPages}</span>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{ padding: "0.5rem 1rem", borderRadius: "6px", backgroundColor: "#e2e8f0", border: "none" }}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default Transactions;
