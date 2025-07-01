// src/pages/dashboard.jsx
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import houseImg from "../assets/house.png";

const COLORS = ["#6366f1", "#22c55e", "#facc15", "#f87171"];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-xs font-semibold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(stored);
  }, []);

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expenditure = transactions
    .filter(t => t.type !== "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = income - expenditure;
  const recent = [...transactions].reverse().slice(0, 5);

  const spendingData = [
    { name: "Rent", value: 9000 },
    { name: "Food", value: 7000 },
    { name: "Going Out", value: 2000 },
    { name: "Miscellaneous", value: 2000 },
  ];

  const goalTotal = 5000000;
  const rawSaved = income - expenditure;
  const goalSaved = rawSaved > 0 ? rawSaved : 0;
  const goalPercent = Math.max(Math.min((goalSaved / goalTotal) * 100, 100), 20);

  return (
    <div className="min-h-screen w-screen bg-white text-gray-800 px-8 py-12 space-y-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        <Card className="bg-white shadow-md border hover:shadow-lg transition duration-300">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold text-gray-600 mb-2">Total Income</h2>
            <p className="text-3xl font-bold text-green-500">₹ {income}</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md border hover:shadow-lg transition duration-300">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold text-gray-600 mb-2">Total Expenditure</h2>
            <p className="text-3xl font-bold text-red-500">₹ {expenditure}</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md border hover:shadow-lg transition duration-300">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold text-gray-600 mb-2">Balance</h2>
            <p className="text-3xl font-bold text-blue-500">₹ {balance}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl w-full mx-auto">
        <motion.div className="space-y-4 lg:col-span-1">
          <Card className="bg-white shadow-md border hover:shadow-lg transition duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-800">Goal: Buy a House</h2>
                <img src={houseImg} alt="House" className="w-10 h-10" />
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${goalPercent}%` }}
                  transition={{ duration: 1 }}
                  className="h-4 rounded-full bg-green-500 relative group"
                >
                  <motion.div
                    className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm text-gray-700 bg-white px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition"
                  >
                    ₹ {goalSaved.toLocaleString()}
                  </motion.div>
                </motion.div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md border hover:shadow-lg transition duration-300">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Recent Transactions</h2>
              <div className="space-y-2">
                {recent.map((txn, i) => (
                  <div key={i} className="flex justify-between text-sm text-gray-700">
                    <span>{txn.title}</span>
                    <span className={`font-semibold ${
                      txn.type === "income" ? "text-green-500" : "text-red-500"
                    }`}>
                      ₹ {txn.amount}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div className="lg:col-span-2">
          <Card className="bg-white shadow-md border hover:shadow-lg transition duration-300">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Major Expenditure</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={spendingData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    labelLine={false}
                    label={renderCustomizedLabel}
                  >
                    {spendingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} iconSize={10} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
