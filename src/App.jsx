import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Import from "./pages/Import";

function App() {
  return (
    <div className="flex min-h-screen gap-x-20">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/budgets" element={<Budgets />} />
        <Route path="/import" element={<Import />} />
      </Routes>
    </div>
  );
}

export default App;
