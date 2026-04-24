import { Link } from "react-router-dom";
import { Budget } from "../types";

interface BudgetListProps {
  budget: Budget;
  budgetCalculation: number;
}

const BudgetList = ({ budget, budgetCalculation }: BudgetListProps) => {
  const progressPercentage = Math.min((budgetCalculation / budget.amount) * 100, 100);
  const isOverBudget = budgetCalculation > budget.amount;

  return (
    <Link
      to={`/budgets/${budget.id}`}
      className="bg-gray-800 rounded-xl border border-gray-700/50 p-5 flex flex-col justify-between h-44 hover:border-[#646cff]/50 transition-colors"
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-base font-bold text-white">{budget.name}</h2>
          <p className="text-xs text-gray-400 mt-0.5">{budget.category}</p>
        </div>
        <span className="text-lg font-bold text-[#646cff]">${budget.amount}</span>
      </div>

      <div>
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>${budgetCalculation.toFixed(2)} spent</span>
          <span className={isOverBudget ? "text-red-400" : ""}>
            ${Math.abs(budget.amount - budgetCalculation).toFixed(2)}{" "}
            {isOverBudget ? "over" : "remaining"}
          </span>
        </div>
        <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
          <div
            style={{ width: `${progressPercentage}%` }}
            className={`h-full rounded-full transition-all ${isOverBudget ? "bg-red-500" : "bg-[#646cff]"}`}
          />
        </div>
      </div>
    </Link>
  );
};

export default BudgetList;
