import { useState } from "react";

const TransactionForm = () => {
  const [transactionData, setTransactionData] = useState({
    type: "expense",
    amount: "",
    description: "",
    category: "groceries",
    date: new Date().toISOString().split("T")[0],
  });
  const [transactionList, setTransactionList] = useState([]);
  const [errors, setErrors] = useState({});

  function validateForm() {
    const newErrors = {};

    if (!transactionData.amount) {
      newErrors.amount = "Amount is required";
    } else if (parseFloat(transactionData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!transactionData.description.trim()) {
      newErrors.description = "Description is required";
    }

    return newErrors;
  }
  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const newTransactions = {
      ...transactionData,
      id: Date.now(),
    };

    setTransactionList([...transactionList, newTransactions]);

    setTransactionData({
      type: "expense",
      amount: "",
      description: "",
      category: "groceries",
      date: new Date().toISOString().split("T")[0],
    });
  }

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex gap-5 mt-5">
          <button
            className={`py-2 px-4  rounded-lg cursor-pointer hover:bg-red-500 ${
              transactionData.type === "expense"
                ? "bg-red-600 hover:bg-red-500"
                : "bg-gray-600"
            }`}
            type="button"
            onClick={() =>
              setTransactionData({ ...transactionData, type: "expense" })
            }
          >
            Expense
          </button>
          <button
            className={`py-2 px-4  border-none rounded-lg cursor-pointer hover:bg-green-500 ${
              transactionData.type === "income"
                ? "bg-green-600 hover:bg-green-500"
                : "bg-gray-600"
            }`}
            type="button"
            onClick={() =>
              setTransactionData({ ...transactionData, type: "income" })
            }
          >
            Income
          </button>
        </div>
        <div className="flex flex-col">
          <label>Amount</label>
          <input
            name="amount"
            type="number"
            placeholder="0.00"
            className="bg-gray-600 text-white p-2 rounded mt-1"
            onChange={(e) => {
              setTransactionData({
                ...transactionData,
                amount: e.target.value,
              });
              // Clear the error for this field when user types
              if (errors.amount) {
                setErrors({ ...errors, amount: undefined });
              }
            }}
            value={transactionData.amount}
          />
          {errors.amount && (
            <span className="text-red-500 text-sm mt-1">{errors.amount}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label>Description</label>
          <input
            name="description"
            type="text"
            placeholder="e.g., Starbucks coffee"
            className="bg-gray-600 text-white p-2 rounded mt-1"
            onChange={(e) => {
              setTransactionData({
                ...transactionData,
                description: e.target.value,
              });
              // Clear the error for this field when user types
              if (errors.description) {
                setErrors({ ...errors, description: undefined });
              }
            }}
            value={transactionData.description}
          />
          {errors.description && (
            <span className="text-red-500 text-sm mt-1">
              {errors.description}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label>Category</label>
          <select
            className="bg-gray-600 text-white p-2 rounded mt-1"
            name="category"
            onChange={(e) =>
              setTransactionData({
                ...transactionData,
                category: e.target.value,
              })
            }
            value={transactionData.category}
          >
            <option value="groceries">Groceries</option>
            <option value="transportation">Transportation</option>
            <option value="entertainment">Entertainment</option>
            <option value="dining">Dining</option>
            <option value="shopping">Shopping</option>
            <option value="bills">Bills</option>
            <option value="healthcare">Healthcare</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label>Date</label>

          <input
            name="date"
            type="date"
            value={transactionData.date}
            onChange={(e) =>
              setTransactionData({ ...transactionData, date: e.target.value })
            }
            className="bg-gray-600 text-white p-2 rounded mt-1"
          />
        </div>
        <button
          type="submit"
          className="py-2 px-4  rounded-lg cursor-pointer bg-[#646cff]"
        >
          Add Transaction
        </button>
      </form>

      {/* Temporary - just to test */}
      <div className="mt-8">
        <h2>Transactions:</h2>
        <pre>{JSON.stringify(transactionList, null, 2)}</pre>
      </div>
    </>
  );
};

export default TransactionForm;
