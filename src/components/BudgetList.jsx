import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const BudgetList = ({ budget, budgetCalculation, handleDelete }) => {
  const progressPercentage = (budgetCalculation / budget.amount) * 100;

  return (
    <>
      <div className="flex flex-col w-90 h-45  rounded-lg border p-5 justify-around">
        <Link to={`/budgets/${budget.id}`}>
          <div className="flex justify-between">
            <div>
              <h2 className="text-lg font-bold ">{budget.name}</h2>
              <p>{budget.category}</p>
            </div>
            <span className="text-lg font-bold text-[#646cff] content-center">
              ${budget.amount}
            </span>
          </div>

          <div className="flex justify-between">
            <span>${budgetCalculation} spent</span>
            <span>${budget.amount - budgetCalculation} remaining</span>
            <span
              className="cursor-pointer"
              onClick={() => handleDelete(budget.id)}
            >
              <Trash2 />
            </span>
          </div>
          <div className=" h-2 w-full bg-gray-300 rounded-xl  ">
            <div
              style={{ maxWidth: `${progressPercentage}%` }}
              className={`h-full bg-[#646cff]`}
            ></div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default BudgetList;

//have total amount spent in that category, now calculate how much of the budget is actually left
