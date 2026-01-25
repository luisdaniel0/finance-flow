import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Import from "./pages/Import";
import { useState } from "react";

function App() {
  const [transactionList, setTransactionList] = useState(
    JSON.parse(localStorage.getItem("transactions")) || [],
  );
  return (
    <div className="flex">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Dashboard transactionList={transactionList} />}
        />
        <Route
          path="/transactions"
          element={
            <Transactions
              transactionList={transactionList}
              setTransactionList={setTransactionList}
            />
          }
        />
        <Route
          path="/budgets"
          element={<Budgets transactionList={transactionList} />}
        />
        <Route path="/import" element={<Import />} />
      </Routes>
    </div>
  );
}

export default App;
