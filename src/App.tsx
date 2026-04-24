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
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  function fetchData() {
    setIsLoading(true);
    setFetchError(null);
    Promise.all([getTransactions(), getBudgets()])
      .then(([transactions, fetchedBudgets]) => {
        setTransactionList(transactions);
        setBudgets(fetchedBudgets);
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "Unknown error";
        setFetchError(message);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    if (!isLoggedIn) return;
    fetchData();
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
          <div className="flex h-screen overflow-hidden">
            <Navbar onLogout={handleLogout} />
            {isLoading ? (
              <div className="flex flex-1 items-center justify-center h-screen">
                <div className="w-10 h-10 border-4 border-[#646cff] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : fetchError ? (
              <div className="flex flex-1 flex-col items-center justify-center h-screen gap-4">
                <p className="text-red-400 text-lg font-semibold">Could not reach the server</p>
                <p className="text-gray-400 text-sm">{fetchError}</p>
                <button
                  className="py-2 px-4 rounded-lg bg-[#646cff] cursor-pointer"
                  onClick={fetchData}
                >
                  Retry
                </button>
              </div>
            ) : (
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
            )}
          </div>
        }
      />
    </Routes>
  );
}

export default App;
