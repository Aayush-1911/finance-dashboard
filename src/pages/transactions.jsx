// src/pages/transactions.jsx
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [sort, setSort] = useState("none");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(stored.reverse());
  }, []);

  const filtered = transactions.filter((txn) => {
    const matchesSearch = txn.title.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "all" || txn.type === filterType;
    return matchesSearch && matchesType;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "amount-low") return a.amount - b.amount;
    if (sort === "amount-high") return b.amount - a.amount;
    if (sort === "alpha") return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <div className="min-h-screen w-screen bg-white text-gray-800 px-8 py-12 space-y-8 flex flex-col items-center relative">
      <div className="w-full max-w-5xl space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">All Transactions</h1>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 rounded-md border bg-gray-50">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search transactions..."
            className="w-full md:w-64 p-2 border rounded-md"
          />
          <div className="flex gap-2 w-full md:w-auto">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="p-2 border rounded-md text-sm"
            >
              <option value="none">Sort</option>
              <option value="amount-low">Amount ↑</option>
              <option value="amount-high">Amount ↓</option>
              <option value="alpha">Title A-Z</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="p-2 border rounded-md text-sm"
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
        </div>

        {sorted.length === 0 ? (
          <p className="text-gray-500 text-center">No transactions found.</p>
        ) : (
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            {sorted.map((txn, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
              >
                <Card className="shadow-md bg-white border hover:shadow-lg">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-800">{txn.title || "Unnamed"}</p>
                      <p className="text-sm text-gray-500">{txn.category || "General"}</p>
                    </div>
                    <p
                      className={`text-lg font-semibold ${
                        txn.type === "income" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      ₹ {txn.amount}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Link
        to="/add-transaction"
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-transform transform hover:scale-110"
      >
        <Plus className="w-6 h-6" />
      </Link>
    </div>
  );
}
