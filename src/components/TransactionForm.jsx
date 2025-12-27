import { useState } from "react";

const TransactionForm = () => {
  const [selected, setSelected] = useState("expense");

  return (
    <div className="flex gap-5 mt-5">
      <button
        className={`flex-1 py-2 px-4  rounded-lg cursor-pointer hover:bg-red-500 ${
          selected === "expense" ? "bg-red-600 hover:bg-red-500" : "bg-gray-600"
        }`}
        onClick={() => setSelected("expense")}
      >
        Expense
      </button>
      <button
        className={`flex-1 py-2 px-4  border-none rounded-lg cursor-pointer hover:bg-green-500 ${
          selected === "income"
            ? "bg-green-600 hover:bg-green-500"
            : "bg-gray-600"
        }`}
        onClick={() => setSelected("income")}
      >
        Income
      </button>
    </div>
  );
};

export default TransactionForm;
