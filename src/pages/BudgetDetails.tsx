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

  const budget: Budget | undefined = budgets.find(
    (b) => b.id === Number(id),
  );

  if (!budget) {
    return <h2>Budget not found</h2>;
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
    <>
      <div className="w-full p-8 m-8">
        <Link to="/budgets">
          <button className="mb-10 cursor-pointer flex gap-3 items-center">
            <ArrowLeft size={30} /> Back to Budgets
          </button>
        </Link>
        <div className="grid grid-cols-2">
          <div className="flex flex-col w-100 h-45 rounded-lg border p-5 justify-around">
            <div className="flex justify-between">
              <div>
                {!editing ? (
                  <p className="text-lg font-bold">{budget.name}</p>
                ) : (
                  <input
                    className="text-lg font-bold"
                    type="text"
                    value={budget.name}
                    onChange={(e) => editBudget(e, "name")}
                  />
                )}

                {!editing ? (
                  <p className="font-bold">{budget.category}</p>
                ) : (
                  <select
                    className="bg-gray-600 text-white rounded mt-1 w-40"
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
                <p className="text-lg font-bold text-regal-blue">
                  ${budget.amount}
                </p>
              ) : (
                <input
                  className="flex text-end text-lg font-bold text-regal-blue w-full"
                  type="text"
                  value={budget.amount}
                  onChange={(e) => editBudget(e, "amount")}
                />
              )}
            </div>
            <div className="flex justify-between">
              <span>${budgetCalculation} spent</span>
              <span>${budget.amount - budgetCalculation} remaining</span>
            </div>
            <div className="h-2 w-full bg-gray-300 rounded-xl">
              <div
                style={{ width: `${progressPercentage}%` }}
                className="h-full bg-[#646cff]"
              ></div>
            </div>
          </div>
          <div className="flex items-center gap-5">
            {editing ? (
              <button
                className="flex gap-1 cursor-pointer p-4 rounded-lg bg-regal-blue"
                onClick={handleSave}
              >
                <Save />
                <span>Save</span>
              </button>
            ) : (
              <button
                className="flex gap-1 cursor-pointer p-4 rounded-lg bg-regal-blue"
                onClick={() => setEditing(true)}
              >
                <SquarePen />
                <span>Edit</span>
              </button>
            )}

            <button
              className="cursor-pointer flex gap-1 p-4 bg-red-600 rounded-lg"
              onClick={() => handleDeleteBudget(budget.id)}
            >
              <Trash2 />
              <span>Delete</span>
            </button>
          </div>
        </div>
        <h1 className="text-lg font-bold mt-12">
          Latest {budget.category} Transactions
        </h1>
        <div className="grid grid-cols-4 mt-5 font-bold bg-gray-700 p-2">
          <h1>Name</h1>
          <h1>Amount</h1>
          <h1>Date</h1>
          <h1>Action</h1>
        </div>
        <div>
          {recentTransactions.map((transaction) => (
            <div
              className="bg-gray-800 grid grid-cols-4 p-2"
              key={transaction.id}
            >
              <span>{transaction.description}</span>
              <span>{transaction.amount}</span>
              <span>{transaction.date}</span>
              <button
                className="cursor-pointer"
                onClick={() => handleDelete(transaction.id)}
              >
                <Trash2 />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BudgetDetail;
