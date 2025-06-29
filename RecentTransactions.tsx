import React from "react";

type Transaction = {
  id: string;
  category: string;
  amount: number;
  date: string;
};

const RecentTransactions: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {transactions.map((tx) => (
        <li key={tx.id} style={{ marginBottom: "1rem" }}>
          <div style={{ fontWeight: "bold" }}>{tx.category}</div>
          <div style={{ fontSize: "14px" }}>
            ₹{tx.amount} – <span style={{ color: "#ccc" }}>{tx.date}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RecentTransactions;
