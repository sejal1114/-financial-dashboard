import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart, Pie, Cell, Legend,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch transactions", err);
      }
    };

    fetchTransactions();
  }, []);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const pieData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  const barData = transactions.map((t) => ({
    name: t.title,
    amount: t.amount,
  }));

  return (
    <div style={{ padding: "2rem", fontFamily: "Poppins" }}>
      <h2>📊 Dashboard</h2>

      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {/* Pie Chart */}
        <div style={{ width: "300px", height: "300px" }}>
          <PieChart width={300} height={300}>
            <Pie data={pieData} dataKey="value" outerRadius={100} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>

        {/* Bar Chart */}
        <div style={{ width: "500px", height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transaction List */}
      <div style={{ marginTop: "2rem" }}>
        <h3>📃 Transactions</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {transactions.map((txn) => (
            <li
              key={txn._id}
              style={{
                padding: "0.75rem",
                marginBottom: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <strong>{txn.title}</strong> - ₹{txn.amount} ({txn.category})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
