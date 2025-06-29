import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", value: 1200 },
  { name: "Feb", value: 1800 },
  { name: "Mar", value: 1000 },
  { name: "Apr", value: 2200 },
  { name: "May", value: 1600 },
  { name: "Jun", value: 2000 },
];

const OverviewChart: React.FC = () => {
  return (
    <div style={{ width: "100%", height: 300, background: "#fff", padding: "1rem", borderRadius: "8px" }}>
      <h3 style={{ marginBottom: "1rem", color: "#2D3748" }}>📊 Overview</h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3182CE"
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OverviewChart;
