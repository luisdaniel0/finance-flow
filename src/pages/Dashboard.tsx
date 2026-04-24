import { PiggyBank, BanknoteArrowUp, BanknoteArrowDown, WalletCards } from "lucide-react";
import { Cell, Pie, PieChart, Tooltip, Legend } from "recharts";
import type { Transaction } from "../types";

interface DashboardProps {
  transactionList: Transaction[];
}

interface CategoryAmounts {
  [key: string]: number;
}

const COLORS = ["#646cff", "#00C49F", "#FFBB28", "#FF8042", "#f355c4", "#f34444"];

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

const Dashboard = ({ transactionList }: DashboardProps) => {
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

  const income = transactionList.filter((tran) => {
    const tranDate = new Date(tran.date);
    return (
      tran.type === "income" &&
      tranDate.getMonth() === currentDateMonth &&
      tranDate.getFullYear() === currentDateYear
    );
  });

  const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = expense.reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  const categoryTotals = expense.reduce((totals: CategoryAmounts, t) => {
    totals[t.category] = (totals[t.category] ?? 0) + t.amount;
    return totals;
  }, {});

  const chartData = Object.entries(categoryTotals).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  const stats = [
    {
      label: "Balance",
      value: `${balance < 0 ? "-" : ""}$${fmt(Math.abs(balance))}`,
      icon: PiggyBank,
      valueColor: balance >= 0 ? "text-green-400" : "text-red-400",
      iconBg: "bg-[#646cff]/20",
      iconColor: "text-[#646cff]",
    },
    {
      label: "Income",
      value: `$${fmt(totalIncome)}`,
      icon: BanknoteArrowUp,
      valueColor: "text-green-400",
      iconBg: "bg-green-500/20",
      iconColor: "text-green-400",
    },
    {
      label: "Expenses",
      value: `$${fmt(totalExpenses)}`,
      icon: BanknoteArrowDown,
      valueColor: "text-red-400",
      iconBg: "bg-red-500/20",
      iconColor: "text-red-400",
    },
    {
      label: "Transactions",
      value: expense.length + income.length,
      icon: WalletCards,
      valueColor: "text-white",
      iconBg: "bg-gray-700",
      iconColor: "text-gray-300",
    },
  ];

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      <p className="text-gray-400 mt-1 text-sm">
        Here's what's happening with your money this month.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {stats.map(({ label, value, icon: Icon, valueColor, iconBg, iconColor }) => (
          <div
            key={label}
            className="bg-gray-800 rounded-xl p-5 border border-gray-700/50 flex justify-between items-start"
          >
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
              <p className={`text-xl font-bold mt-1 ${valueColor}`}>{value}</p>
            </div>
            <div className={`p-2 rounded-lg ${iconBg}`}>
              <Icon size={18} className={iconColor} />
            </div>
          </div>
        ))}
      </div>

      {chartData.length > 0 ? (
        <div className="mt-8 bg-gray-800 rounded-xl border border-gray-700/50 p-6 w-fit">
          <h2 className="text-base font-semibold text-white mb-4">Spending by Category</h2>
          <PieChart width={520} height={320}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={{ position: "inside", fill: "white", fontSize: "11" }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "white",
              }}
              formatter={(value: number | undefined) => [`$${fmt(value ?? 0)}`]}
            />
            <Legend />
          </PieChart>
        </div>
      ) : (
        <div className="mt-8 bg-gray-800 rounded-xl border border-gray-700/50 p-12 text-center w-fit">
          <p className="text-gray-400">No expense data for this month yet.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
