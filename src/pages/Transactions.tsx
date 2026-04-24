import { useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import { autoCategorizeDescription } from "../services/apiCall";
import { Transaction } from "../types";

interface TransactionProps {
  transactionList: Transaction[];
  setTransactionList: React.Dispatch<React.SetStateAction<Transaction[]>>;
  handleDelete: (transactionId: number) => void;
}

const Transactions = ({
  transactionList,
  setTransactionList,
  handleDelete,
}: TransactionProps) => {
  const [transactionData, setTransactionData] = useState({
    type: "expense",
    amount: "",
    description: "",
    category: "Groceries",
    date: new Date().toISOString().split("T")[0],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [lastCallTime, setLastCallTime] = useState(0);

  const expenseCategory = [
    "Groceries",
    "Transportation",
    "Dining",
    "Bills",
    "Shopping",
    "Healthcare",
    "Other",
  ];

  const incomeCategory = [
    "Salary",
    "Freelance",
    "Business",
    "Investment",
    "Gift",
    "Bonus",
    "Refund",
    "Other",
  ];

  const categoryType =
    transactionData.type === "expense" ? expenseCategory : incomeCategory;

  async function handleAutoCategorize() {
    const now = Date.now();
    if (now - lastCallTime < 15000) {
      alert("Please wait 15 seconds between categorizations");
      return;
    }
    if (isLoading) return;

    setIsLoading(true);
    setLastCallTime(now);

    try {
      const aiCategorize = await autoCategorizeDescription(
        transactionData.description,
        categoryType,
      );
      if (aiCategorize) {
        setTransactionData({ ...transactionData, category: aiCategorize });
      }
    } catch {
      alert("Failed to categorize. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <h1 className="text-2xl font-bold text-white">Transactions</h1>
      <p className="text-gray-400 mt-1 text-sm mb-8">
        Add and manage your transactions.
      </p>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="bg-gray-800 rounded-xl border border-gray-700/50 p-6 w-full lg:w-80 shrink-0">
          <TransactionForm
            isLoading={isLoading}
            transactionList={transactionList}
            setTransactionList={setTransactionList}
            transactionData={transactionData}
            setTransactionData={setTransactionData}
            handleAutoCategorize={handleAutoCategorize}
            expenseCategory={expenseCategory}
            incomeCategory={incomeCategory}
          />
        </div>

        <div className="flex-1 min-w-0">
          <TransactionList
            transactionList={transactionList}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
