import { Trash2 } from "lucide-react";
import { Transaction } from "../types";

interface TransactionListProps {
  transactionList: Transaction[];
  handleDelete: (transactionId: number) => void;
}

const TransactionList = ({
  transactionList,
  handleDelete,
}: TransactionListProps) => {
  if (transactionList.length === 0) {
    return (
      <p className="text-gray-500 text-sm mt-4">No transactions yet. Add one to get started.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
      {transactionList.map((tran) => (
        <div
          className="bg-gray-800 px-5 py-4 rounded-xl border border-gray-700/50 flex justify-between items-center group hover:border-gray-600 transition-colors"
          key={tran.id}
        >
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-white font-medium text-sm truncate">
              {tran.description
                ? tran.description.charAt(0).toUpperCase() +
                  tran.description.slice(1).toLowerCase()
                : "—"}
            </span>
            <span className="text-xs text-gray-500">{tran.date}</span>
            <span className="text-xs text-gray-500">{tran.category}</span>
          </div>

          <div className="flex items-center gap-3 shrink-0 ml-4">
            <button
              className="invisible group-hover:visible cursor-pointer text-gray-500 hover:text-red-400 transition-colors"
              onClick={() => handleDelete(tran.id)}
            >
              <Trash2 size={16} />
            </button>
            <span
              className={`font-bold text-base ${
                tran.type === "expense" ? "text-red-400" : "text-green-400"
              }`}
            >
              {tran.type === "expense" ? "-" : "+"}$
              {new Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(tran.amount)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
