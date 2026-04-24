import BudgetForm from "../components/BudgetForm";
import BudgetList from "../components/BudgetList";
import type { Budget, Transaction } from "../types";
import { createBudget } from "../services/api";

interface BudgetsProps {
  transactionList: Transaction[];
  budgets: Budget[];
  setBudgets: React.Dispatch<React.SetStateAction<Budget[]>>;
}

const Budgets = ({ transactionList, budgets, setBudgets }: BudgetsProps) => {
  const budgetCategories = [
    "Groceries",
    "Transportation",
    "Dining",
    "Bills",
    "Shopping",
    "Healthcare",
    "Other",
  ];

  async function addBudget(name: string, amount: number, category: string) {
    const created = await createBudget({ name, amount, category });
    setBudgets([...budgets, created]);
  }

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <h1 className="text-2xl font-bold text-white">My Budgets</h1>
      <p className="text-gray-400 mt-1 text-sm mb-8">
        Track and manage your spending limits.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BudgetForm addBudget={addBudget} budgetCategories={budgetCategories} />
        {budgets.map((budget) => {
          const budgetCalculation = transactionList
            .filter((tran) => tran.category === budget.category)
            .reduce((sum, transaction) => sum + transaction.amount, 0);
          return (
            <BudgetList
              key={budget.id}
              budget={budget}
              budgetCalculation={budgetCalculation}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Budgets;
