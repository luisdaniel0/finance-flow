import { useParams } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { SquarePen } from "lucide-react";
import { Link } from "react-router-dom";
import { Save, ArrowLeft } from "lucide-react";
import { useState } from "react";

const BudgetDetail = ({
  transactionList,
  budgets,
  setBudgets,
  handleDelete,
}) => {
  const [editing, setEditing] = useState(false);
  const { id } = useParams();
  const expenseCategory = [
    "Groceries",
    "Transportation",
    "Dining",
    "Bills",
    "Shopping",
    "Healthcare",
    "Other",
  ];
  const budget = budgets.find((tran) => tran.id === Number(id));
  const recentTransactions = transactionList.filter(
    (transaction) => transaction.category === budget.category,
  );

  const budgetCalculation = transactionList
    .filter((tran) => {
      return tran.category === budget.category;
    })
    .reduce((sum, transaction) => {
      return sum + parseFloat(transaction.amount);
    }, 0);

  const progressPercentage = (budgetCalculation / budget.amount) * 100;

  function deleteBudget(budgetId) {
    setBudgets(budgets.filter((budget) => budget.id !== budgetId));
  }

  function handleEdit() {
    setEditing(true);
  }

  function editBudget(e, inputField) {
    setBudgets(
      budgets.map((b) => {
        if (b.id === budget.id) {
          return { ...b, [inputField]: e.target.value };
        } else {
          return b;
        }
      }),
    );
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
          <div className="flex flex-col w-100 h-45  rounded-lg border p-5 justify-around">
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

                {/* onChange={editFunction(e,name)} */}

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
                  className="flex text-end text-lg font-bold text-regal-blue w-full "
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
            <div className=" h-2 w-full bg-gray-300 rounded-xl  ">
              <div
                style={{ maxWidth: `${progressPercentage}%` }}
                className={`h-full bg-[#646cff]`}
              ></div>
            </div>
          </div>
          <div className="flex  items-center gap-5">
            {editing ? (
              <button
                className="flex gap-1 cursor-pointer  p-4 rounded-lg bg-regal-blue"
                onClick={() => setEditing(false)}
              >
                <Save />
                <span>Save</span>
              </button>
            ) : (
              <button
                className="flex gap-1 cursor-pointer  p-4 rounded-lg bg-regal-blue"
                onClick={() => handleEdit()}
              >
                <SquarePen />
                <span>Edit</span>
              </button>
            )}

            <Link to="/budgets">
              <button
                className="cursor-pointer flex gap-1 p-4 bg-red-600 rounded-lg "
                onClick={() => deleteBudget(budget.id)}
              >
                <Trash2 />
                <span>Delete</span>
              </button>
            </Link>
          </div>
        </div>
        <h1 className="text-lg font-bold mt-12">
          Latest {budget.category} Transactions
        </h1>
        <div className="grid grid-cols-4 mt-5 font-bold bg-gray-700 p-2 ">
          <div className="">
            <h1>Name</h1>
          </div>
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
              <div className="">
                <span>{transaction.description}</span>
              </div>
              <div>
                <span>{transaction.amount}</span>
              </div>
              <div>
                <span>{transaction.date}</span>
              </div>
              <div>
                <button
                  className="cursor-pointer"
                  onClick={() => handleDelete(transaction.id)}
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BudgetDetail;
