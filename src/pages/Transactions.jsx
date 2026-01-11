import { useState, useEffect } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import { autoCategorizeDescription } from "../services/apiCall";

const Transactions = () => {
  const [transactionList, setTransactionList] = useState(
    JSON.parse(localStorage.getItem("transactions")) || []
  );

  const [transactionData, setTransactionData] = useState({
    type: "expense",
    amount: "",
    description: "",
    category: "Groceries",
    date: new Date().toISOString().split("T")[0],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [lastCallTime, setLastCallTime] = useState(0);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactionList));
  }, [transactionList]);

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
    // Prevent rapid clicking
    const now = Date.now();
    if (now - lastCallTime < 15000) {
      alert("Please wait 15 seconds between categorizations");
      return;
    }

    if (isLoading) return; // Already processing

    setIsLoading(true);
    setLastCallTime(now);

    try {
      // Your AI call here
      const aiCategorize = await autoCategorizeDescription(
        transactionData.description,
        categoryType
      );
      console.log("AI CATEGORY: " + aiCategorize);
      // Just capitalize first letter
      const cleanCategory = aiCategorize.trim();
      const capitalized =
        cleanCategory.charAt(0).toUpperCase() +
        cleanCategory.slice(1).toLowerCase();
      setTransactionData({ ...transactionData, category: aiCategorize });
      return aiCategorize;
    } catch (error) {
      alert("Failed to categorize. Please try again later.", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleDelete(transactionId) {
    setTransactionList(
      transactionList.filter((transaction) => transaction.id !== transactionId)
    );
  }

  return (
    <div className="w-full p-8 m-8">
      <h1>Transactions</h1>
      <TransactionForm
        isLoading={isLoading}
        lastCallTime={lastCallTime}
        transactionList={transactionList}
        setTransactionList={setTransactionList}
        transactionData={transactionData}
        setTransactionData={setTransactionData}
        handleAutoCategorize={handleAutoCategorize}
        expenseCategory={expenseCategory}
        incomeCategory={incomeCategory}
      />
      <TransactionList
        transactionList={transactionList}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Transactions;
