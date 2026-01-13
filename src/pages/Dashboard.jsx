import { PiggyBank } from "lucide-react";
import { BanknoteArrowUp } from "lucide-react";
import { BanknoteArrowDown } from "lucide-react";
import { WalletCards } from "lucide-react";

const Dashboard = ({ transactionList }) => {
  const expense = transactionList.filter((tran) => tran.type === "expense");
  const income = transactionList.filter((tran) => tran.type === "income");

  function sumOfIncome() {
    const total = income.reduce(
      (sum, transaction) => sum + parseFloat(transaction.amount),
      0
    );
    return total;
  }

  function sumOfExpense() {
    const total = expense.reduce(
      (sum, transaction) => sum + parseFloat(transaction.amount),
      0
    );
    return total;
  }

  const totalIncome = sumOfIncome();
  const totalExpenses = sumOfExpense();
  const balance = totalIncome - totalExpenses;

  return (
    <div className="w-full p-8 m-8">
      <h1>Dashboard</h1>
      <div className="mt-4 p-4 grid grid-cols-4 gap-4 ">
        <div className="border-1 p-6 flex justify-between items-center ">
          Balance<br></br>
          {balance}
          <PiggyBank />
        </div>
        <div className="border-1 p-6 flex justify-between items-center">
          Income<br></br>
          {totalIncome} <BanknoteArrowUp />
        </div>
        <div className="border-1 p-6  flex justify-between items-center">
          Expenses<br></br>
          {totalExpenses} <BanknoteArrowDown />
        </div>
        <div className="border-1 p-6  flex justify-between items-center">
          Transaction Count<br></br> {transactionList.length} <WalletCards />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
