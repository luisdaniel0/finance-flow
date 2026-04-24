import { useParams, Link, useNavigate } from "react-router-dom";
import { Trash2, SquarePen, Save, ArrowLeft } from "lucide-react";
import { useState } from "react";
import type { Budget, Transaction } from "../types";
import { updateBudget, deleteBudget } from "../services/api";

interface BudgetDetailProps {
  transactionList: Transaction[];
  budgets: Budget[];
  setBudgets: React.Dispatch<React.SetStateAction<Budget[]>>;
  handleDelete: (transactionId: number) => void;
}

const BudgetDetail = ({
  transactionList,
  budgets,
  setBudgets,
  handleDelete,
}: BudgetDetailProps) => {
  const [editing, setEditing] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const expenseCategory = [
    "Groceries",
    "Transportation",
    "Dining",
    "Bills",
    "Shopping",
    "Healthcare",
    "Other",
  ];

  const budget: Budget | undefined = budgets.find((b) => b.id === Number(id));

  if (!budget) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <p className="text-gray-400">Budget not found.</p>
      </div>
    );
  }

  const currentBudget: Budget = budget;

  const recentTransactions = transactionList.filter(
    (transaction) => transaction.category === budget.category,
  );

  const budgetCalculation = transactionList
    .filter((tran) => tran.category === budget.category)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const progressPercentage = Math.min(
    (budgetCalculation / budget.amount) * 100,
    100,
  );

  const isOverBudget = budgetCalculation > budget.amount;

  function editBudget(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    inputField: keyof Budget,
  ) {
    setBudgets(
      budgets.map((b) =>
        b.id === currentBudget.id ? { ...b, [inputField]: e.target.value } : b,
      ),
    );
  }

  async function handleSave() {
    await updateBudget(currentBudget.id, {
      name: currentBudget.name,
      amount: parseFloat(String(currentBudget.amount)),
      category: currentBudget.category,
    });
    setEditing(false);
  }

  async function handleDeleteBudget(budgetId: number) {
    await deleteBudget(budgetId);
    setBudgets(budgets.filter((b) => b.id !== budgetId));
    navigate("/budgets");
  }

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <Link
        to="/budgets"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Budgets
      </Link>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="bg-gray-800 rounded-xl border border-gray-700/50 p-6 w-full lg:w-96">
          <div className="flex justify-between items-start mb-4">
            <div>
              {!editing ? (
                <p className="text-lg font-bold text-white">{budget.name}</p>
              ) : (
                <input
                  className="text-lg font-bold bg-gray-700 text-white rounded px-2 py-1 w-40"
                  type="text"
                  value={budget.name}
                  onChange={(e) => editBudget(e, "name")}
                />
              )}
              {!editing ? (
                <p className="text-sm text-gray-400 mt-1">{budget.category}</p>
              ) : (
                <select
                  className="bg-gray-700 text-white rounded px-2 py-1 mt-1 text-sm"
                  onChange={(e) => editBudget(e, "category")}
                  value={budget.category}
                >
                  {expenseCategory.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              )}
            </div>
            {!editing ? (
              <p className="text-xl font-bold text-[#646cff]">${budget.amount}</p>
            ) : (
              <input
                className="text-xl font-bold text-[#646cff] bg-gray-700 rounded px-2 py-1 w-28 text-right"
                type="text"
                value={budget.amount}
                onChange={(e) => editBudget(e, "amount")}
              />
            )}
          </div>

          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>${budgetCalculation.toFixed(2)} spent</span>
            <span className={isOverBudget ? "text-red-400" : "text-gray-400"}>
              ${Math.abs(budget.amount - budgetCalculation).toFixed(2)}{" "}
              {isOverBudget ? "over" : "remaining"}
            </span>
          </div>
          <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
            <div
              style={{ width: `${progressPercentage}%` }}
              className={`h-full rounded-full transition-all ${isOverBudget ? "bg-red-500" : "bg-[#646cff]"}`}
            />
          </div>
        </div>

        <div className="flex gap-3">
          {editing ? (
            <button
              className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg bg-[#646cff] text-white text-sm font-medium"
              onClick={handleSave}
            >
              <Save size={16} />
              Save
            </button>
          ) : (
            <button
              className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium transition-colors"
              onClick={() => setEditing(true)}
            >
              <SquarePen size={16} />
              Edit
            </button>
          )}
          <button
            className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-medium transition-colors"
            onClick={() => handleDeleteBudget(budget.id)}
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-base font-semibold text-white mb-4">
          {budget.category} Transactions
        </h2>

        {recentTransactions.length === 0 ? (
          <p className="text-gray-400 text-sm">No transactions in this category yet.</p>
        ) : (
          <div className="bg-gray-800 rounded-xl border border-gray-700/50 overflow-hidden">
            <div className="grid grid-cols-4 px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-700">
              <span>Description</span>
              <span>Amount</span>
              <span>Date</span>
              <span></span>
            </div>
            {recentTransactions.map((transaction, i) => (
              <div
                key={transaction.id}
                className={`grid grid-cols-4 px-4 py-3 items-center text-sm ${
                  i % 2 === 0 ? "bg-gray-800" : "bg-gray-800/50"
                } hover:bg-gray-700/50 transition-colors`}
              >
                <span className="text-white capitalize">{transaction.description}</span>
                <span className="text-red-400 font-medium">${transaction.amount.toFixed(2)}</span>
                <span className="text-gray-400">{transaction.date}</span>
                <button
                  className="cursor-pointer text-gray-500 hover:text-red-400 transition-colors justify-self-end"
                  onClick={() => handleDelete(transaction.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetDetail;
