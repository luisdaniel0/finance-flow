import { useState } from "react";

const TransactionForm = () => {
  const [selected, setSelected] = useState("expense");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  return (
    <>
      <form className="space-y-4">
        <div className="flex gap-5 mt-5">
          <button
            className={`py-2 px-4  rounded-lg cursor-pointer hover:bg-red-500 ${
              selected === "expense"
                ? "bg-red-600 hover:bg-red-500"
                : "bg-gray-600"
            }`}
            type="button"
            onClick={() => setSelected("expense")}
          >
            Expense
          </button>
          <button
            className={`py-2 px-4  border-none rounded-lg cursor-pointer hover:bg-green-500 ${
              selected === "income"
                ? "bg-green-600 hover:bg-green-500"
                : "bg-gray-600"
            }`}
            type="button"
            onClick={() => setSelected("income")}
          >
            Income
          </button>
        </div>
        <div className="flex flex-col">
          <label>Amount</label>
          <input
            type="number"
            placeholder="0.00"
            className="bg-gray-600 text-white p-2 rounded mt-1"
          />
        </div>
        <div className="flex flex-col">
          <label>Description</label>
          <input
            type="text"
            placeholder="e.g., Starbucks coffee"
            className="bg-gray-600 text-white p-2 rounded mt-1"
          />
        </div>
        <div className="flex flex-col">
          <label>Category</label>
          <select className="bg-gray-600 text-white p-2 rounded mt-1">
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
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
    </>
  );
};

export default TransactionForm;
