import { PiggyBank } from "lucide-react";
import { BanknoteArrowUp } from "lucide-react";
import { BanknoteArrowDown } from "lucide-react";
import { WalletCards } from "lucide-react";
import { Cell, Pie, PieChart, Tooltip, Legend } from "recharts";

const Dashboard = ({ transactionList }) => {
  const currentDate = new Date();
  const currentDateMonth = currentDate.getMonth();
  const currentDateYear = currentDate.getFullYear();

  const expense = transactionList.filter((tran) => {
    const tranDate = new Date(tran.date);

    return (
      tran.type === "expense" &&
      tranDate.getMonth() === currentDateMonth &&
      tranDate.getFullYear() === currentDateYear
    );
  });
  console.log(expense);

  const income = transactionList.filter((tran) => {
    const tranDate = new Date(tran.date);

    return (
      tran.type === "income" &&
      tranDate.getMonth() === currentDateMonth &&
      tranDate.getFullYear() === currentDateYear
    );
  });

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

  //come back to this and make sure u understand what this reduce method is doing and how it works with objects
  // Group expenses by category and sum their amounts
  const categoryTotals = expense.reduce((totals, transaction) => {
    if (totals[transaction.category]) {
      // Category exists - add to existing total
      totals[transaction.category] =
        totals[transaction.category] + parseFloat(transaction.amount);
    } else {
      // Category doesn't exist - create it with this amount
      totals[transaction.category] = parseFloat(transaction.amount);
    }
    return totals;
  }, {});

  // Convert object to array format for Recharts
  const chartData = Object.entries(categoryTotals).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    })
  );

  console.log(chartData);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  /*
  [
    ['Dining', 40],
    ['Bills', 1200],
    ['Other', 100]
  ]
  [
    {
      name: "Dining", value: "40"
    },
    {
      name: "Bills", value: 1200
    }
  ]
  */
  return (
    <div className="w-full p-8 m-8">
      <h1>Dashboard</h1>
      <p className="mt-5">
        Here's whats happening with your money this past month. Lets manage your
        expense
      </p>
      <div className="mt-5  grid grid-cols-4 gap-4 ">
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
          Transaction Count<br></br> {expense.length + income.length}
          <WalletCards />
        </div>
      </div>
      <div className="">
        <h1>Spending by Category</h1>
        <PieChart width={500} height={500}>
          <Pie
            data={chartData}
            labelLine={false}
            dataKey={"value"}
            nameKey={"name"}
            cx={"50%"}
            cy={"50%"}
            outerRadius={150}
            label={(entry) => {
              return entry.name;
            }}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default Dashboard;
