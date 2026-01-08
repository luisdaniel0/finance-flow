import { Trash2 } from "lucide-react";

const TransactionList = ({ transactionList }) => {
  return (
    <>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {transactionList.map((tran) => (
          <div className="bg-gray-800 p-6 rounded-lg mb-3 group">
            <div className="flex justify-between items-center ">
              <div className="flex flex-col">
                <span className="text-xl text-gray-400">
                  {tran.description}
                </span>
                <span className="font-semibold text-white">{tran.date}</span>
                <span className="text-sm text-gray-500">{tran.category}</span>
              </div>

              <div className="items-center">
                <button className="px-3 py-0 rounded invisible group-hover:visible cursor-pointer">
                  <Trash2 />
                </button>
                <span
                  className={`font-bold text-xl ml-5 ${
                    tran.type === "expense" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {tran.type === "expense"
                    ? "-" + new Intl.NumberFormat().format(tran.amount)
                    : "+" + new Intl.NumberFormat().format(tran.amount)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TransactionList;
