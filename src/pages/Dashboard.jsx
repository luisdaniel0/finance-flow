import { PiggyBank } from "lucide-react";
import { BanknoteArrowUp } from "lucide-react";
import { BanknoteArrowDown } from "lucide-react";
import { WalletCards } from "lucide-react";

const Dashboard = ({ transactionList }) => {
  function totalBalance() {
    let totalAmount = 0;
    const expense = transactionList.filter((tran) => tran.type === "expense");
    console.log(expense);
    const sumOfExpense = expense.reduce(
      (sum, transaction) => sum + parseFloat(transaction.amount),
      totalAmount
    );
    console.log(sumOfExpense);
    return sumOfExpense;
  }

  return (
    <div className="w-full p-8 m-8">
      <h1>Dashboard</h1>
      <div className="mt-4 p-4 grid grid-cols-4 gap-4">
        <div className="border-1 p-6 flex justify-between">
          Balance<br></br>
          {totalBalance()}
          <PiggyBank />
        </div>
        <div className="border-1 p-6 flex justify-between">
          Income <BanknoteArrowUp />
        </div>
        <div className="border-1 p-6  flex justify-between">
          Expenses <BanknoteArrowDown />
        </div>
        <div className="border-1 p-6  flex justify-between">
          Transaction Count:<br></br> {transactionList.length} <WalletCards />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
