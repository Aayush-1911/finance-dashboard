// src/pages/addTransaction.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function AddTransaction() {
  const [type, setType] = useState("expense");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !date) return;

    const newTxn = {
      type,
      title,
      amount: parseFloat(amount),
      category: title,
      date,
    };

    const stored = JSON.parse(localStorage.getItem("transactions")) || [];
    localStorage.setItem("transactions", JSON.stringify([...stored, newTxn]));
    navigate("/transactions");
  };

  return (
    <div className="min-h-screen w-screen bg-white text-gray-800 px-8 py-12 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <Card className="shadow-md border hover:shadow-lg transition duration-300">
          <CardContent className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Add New Transaction</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Transaction Type</label>
                <div className="flex gap-4">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setType("income")}
                    className={`flex-1 py-2 rounded-md border text-sm font-medium transition ${
                      type === "income"
                        ? "border-green-500 bg-green-100 text-green-700"
                        : "border-gray-300 text-gray-600"
                    }`}
                  >
                    Income
                  </motion.button>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setType("expense")}
                    className={`flex-1 py-2 rounded-md border text-sm font-medium transition ${
                      type === "expense"
                        ? "border-red-500 bg-red-100 text-red-700"
                        : "border-gray-300 text-gray-600"
                    }`}
                  >
                    Expense
                  </motion.button>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Description</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Amount (₹)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <Button
                type="submit"
                className={`w-full ${
                  type === "income"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Add Transaction
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
