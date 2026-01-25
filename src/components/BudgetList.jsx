import { Trash2 } from "lucide-react";

const BudgetList = ({ budget, budgetCalculation, handleDelete }) => {
  console.log(budgetCalculation);
  return (
    <>
      <div className="flex flex-col w-90 h-40  rounded-lg border  ">
        <div className="flex justify-between p-5">
          <div>
            <h2 className="text-lg font-bold ">{budget.name}</h2>
            <p>{budget.category}</p>
          </div>
          <span className="text-lg font-bold text-[#646cff] content-center">
            ${budget.amount}
          </span>
        </div>

        <div className="flex justify-between p-5">
          <span>${budgetCalculation} spent</span>
          <span>${budget.amount - budgetCalculation} remaining</span>
          <span
            className="cursor-pointer"
            onClick={() => handleDelete(budget.id)}
          >
            <Trash2 />
          </span>
        </div>
      </div>
    </>
  );
};

export default BudgetList;

//have total amount spent in that category, now calculate how much of the budget is actually left
