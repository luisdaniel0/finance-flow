import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Import from "./pages/Import";
import { useState } from "react";
import BudgetDetail from "./pages/BudgetDetails";

function App() {
  const [transactionList, setTransactionList] = useState(
    JSON.parse(localStorage.getItem("transactions")) || [],
  );
  const [budgets, setBudgets] = useState(
    JSON.parse(localStorage.getItem("budgets")) || [],
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
          element={
            <Budgets
              transactionList={transactionList}
              budgets={budgets}
              setBudgets={setBudgets}
            />
          }
        />
        <Route
          path="/budgets/:id"
          element={
            <BudgetDetail
              transactionList={transactionList}
              budgets={budgets}
              setBudgets={setBudgets}
            />
          }
        />
        <Route path="/import" element={<Import />} />
      </Routes>
    </div>
  );
}

export default App;
