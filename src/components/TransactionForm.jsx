import { useState } from "react";

const TransactionForm = ({
  transactionList,
  setTransactionList,
  transactionData,
  setTransactionData,
  isLoading,
  handleAutoCategorize,
  incomeCategory,
  expenseCategory,
}) => {
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
      category: "Groceries",
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
              setTransactionData({
                ...transactionData,
                type: "expense",
                category: "groceries",
              })
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
              setTransactionData({
                ...transactionData,
                type: "income",
                category: "salary",
              })
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
            className="bg-gray-600 text-white p-2 rounded mt-1 w-60"
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
            className="bg-gray-600 text-white p-2 rounded mt-1 w-60"
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
          <div className="flex">
            <select
              className="bg-gray-600 text-white p-2 rounded mt-1 w-60"
              name="category"
              onChange={(e) =>
                setTransactionData({
                  ...transactionData,
                  category: e.target.value,
                })
              }
              value={transactionData.category}
            >
              {transactionData.type === "expense"
                ? expenseCategory.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))
                : incomeCategory.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              <option className="hidden">{transactionData.category}</option>
            </select>
            <button
              type="button"
              className={`flex items-center ml-5 border rounded p-2 cursor-pointer ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleAutoCategorize}
            >
              {isLoading ? "Categorizing..." : "Auto-categorize"}
            </button>
          </div>
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
            className="bg-gray-600 text-white p-2 rounded mt-1 w-60"
          />
        </div>
        <button
          type="submit"
          className="py-2 px-4  rounded-lg cursor-pointer bg-[#646cff]"
        >
          Add Transaction
        </button>
      </form>
    </>
  );
};

export default TransactionForm;
