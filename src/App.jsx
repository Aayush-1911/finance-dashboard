// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/navbar";
import Dashboard from "@/pages/dashboard";
import Transactions from "@/pages/transactions";
import AddTransaction from "@/pages/addtransaction";

function App() {
  return (
    <BrowserRouter>
      <div className="p-4">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
