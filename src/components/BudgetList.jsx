import { Link } from "react-router-dom";

const BudgetList = ({ budget, budgetCalculation }) => {
  const progressPercentage = (budgetCalculation / budget.amount) * 100;

  return (
    <>
      <div className=" w-90 h-45  rounded-lg border p-5 ">
        <Link
          to={`/budgets/${budget.id}`}
          className="flex flex-col h-full justify-between"
        >
          <div className="flex justify-between">
            <div>
              <h2 className="text-lg font-bold ">{budget.name}</h2>
              <p>{budget.category}</p>
            </div>
            <span className="text-lg font-bold text-[#646cff] content-center">
              ${budget.amount}
            </span>
          </div>

          <div className="">
            <div className="flex justify-between mb-2">
              <span>${budgetCalculation} spent</span>
              <span>${budget.amount - budgetCalculation} remaining</span>
            </div>
            <div className=" h-2 w-full bg-gray-300 rounded-xl  ">
              <div
                style={{ maxWidth: `${progressPercentage}%` }}
                className={`h-full bg-[#646cff]`}
              ></div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default BudgetList;
