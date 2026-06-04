"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  date: string;
  plusMinus: number;
  courseName: string;
}

interface Props {
  data: DataPoint[];
}

export default function ScoreOverTimeChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="date" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
        <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} />
        <Tooltip
          contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151" }}
          labelStyle={{ color: "#F9FAFB" }}
          formatter={(value: number) =>
            [value > 0 ? `+${value}` : `${value}`, "+/-"]
          }
        />
        <Line
          type="monotone"
          dataKey="plusMinus"
          stroke="#4ADE80"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
