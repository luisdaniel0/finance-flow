import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Import from "./pages/Import";
import { useState, useEffect } from "react";
import BudgetDetail from "./pages/BudgetDetails";
import type { Transaction, Budget } from "./types";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import {
  getToken,
  getTransactions,
  getBudgets,
  deleteTransaction,
} from "./services/api";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const [transactionList, setTransactionList] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    if (!isLoggedIn) return;
    getTransactions().then(setTransactionList).catch(console.error);
    getBudgets().then(setBudgets).catch(console.error);
  }, [isLoggedIn]);

  async function handleDelete(transactionId: number) {
    await deleteTransaction(transactionId);
    setTransactionList((prev) => prev.filter((t) => t.id !== transactionId));
  }

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
  }

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="/signup" element={<Navigate to="/" replace />} />
      <Route
        path="*"
        element={
          <div className="flex">
            <Navbar onLogout={handleLogout} />
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
                    handleDelete={handleDelete}
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
                    handleDelete={handleDelete}
                  />
                }
              />
              <Route
                path="/import"
                element={
                  <Import
                    transactionList={transactionList}
                    setTransactionList={setTransactionList}
                  />
                }
              />
            </Routes>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
