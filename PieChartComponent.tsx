import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

type PieData = { name: string; value: number };

const PieChartComponent: React.FC<{ data: PieData[] }> = ({ data }) => {
  const COLORS = ["#3182ce", "#38a169", "#e53e3e", "#d69e2e", "#805ad5"];

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
