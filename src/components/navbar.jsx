// src/components/navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const location = useLocation();

  const getButtonClass = (path) =>
    location.pathname === path
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-white border border-blue-500 text-blue-600 hover:bg-blue-50";

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 rounded-xl p-4 flex justify-between items-center w-full mb-6 sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold text-blue-600">
        Finance<span className="text-green-500">Tracker</span>
      </Link>
      <div className="flex gap-3 items-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/">
            <Button className={`px-4 py-2 text-sm font-semibold rounded-md ${getButtonClass("/")}`}>
              Dashboard
            </Button>
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/transactions">
            <Button className={`px-4 py-2 text-sm font-semibold rounded-md ${getButtonClass("/transactions")}`}>
              Transactions
            </Button>
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/add-transaction">
            <Button className={`px-4 py-2 text-sm font-semibold rounded-md ${getButtonClass("/add-transaction")}`}>
              + Add Transaction
            </Button>
          </Link>
        </motion.div>
      </div>
    </nav>
  );
}
