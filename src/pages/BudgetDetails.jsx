import { useParams } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { SquarePen } from "lucide-react";
import { Link } from "react-router-dom";

const BudgetDetail = ({ transactionList, budgets, setBudgets }) => {
  const { id } = useParams();

  const budget = budgets.find((tran) => tran.id === Number(id));
  const recentTransactions = transactionList.filter(
    (transaction) => transaction.category === budget.category,
  );

  const budgetCalculation = transactionList
    .filter((tran) => {
      return tran.category === budget.category;
    })
    .reduce((sum, transaction) => {
      return sum + parseFloat(transaction.amount);
    }, 0);

  const progressPercentage = (budgetCalculation / budget.amount) * 100;

  function deleteBudget(budgetId) {
    console.log(budgetId);
    console.log(budgets);
    // const deleted = budgets.filter((budget) => {
    //   return budget.id !== budgetId;
    // });
    // setBudgets({ ...budgets, deleted });
    setBudgets(budgets.filter((budget) => budget.id !== budgetId));
  }

  return (
    <>
      <div className="w-full p-8 m-8">
        <div className="grid grid-cols-2">
          <div className="flex flex-col w-100 h-45  rounded-lg border p-5 justify-around">
            <div className="flex justify-between">
              <h1 className="text-lg font-bold">{budget.name}</h1>
              <p className="text-lg font-bold text-regal-blue">
                ${budget.amount}
              </p>
            </div>
            <div className="flex justify-between">
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
          <div className="flex  items-center gap-5">
            <button className="flex gap-1 cursor-pointer border-2 p-4 rounded-lg bg-regal-blue">
              <SquarePen />
              <span>Edit</span>
            </button>

            <Link to="/budgets">
              <button
                className="cursor-pointer flex gap-1 p-4 bg-red-600 rounded-lg "
                onClick={() => deleteBudget(budget.id)}
              >
                <Trash2 />
                <span>Delete</span>
              </button>
            </Link>
          </div>
        </div>
        <h1 className="text-lg font-bold mt-12">
          Latest {budget.category} Transactions
        </h1>
        <div className="grid grid-cols-4 mt-5 font-bold bg-gray-700 p-2 ">
          <div className="">
            <h1>Name</h1>
          </div>
          <h1>Amount</h1>
          <h1>Date</h1>
          <h1>Action</h1>
        </div>
        <div>
          {recentTransactions.map((transaction) => (
            <div
              className="bg-gray-800 grid grid-cols-4 p-2"
              key={transaction.id}
            >
              <div className="">
                <span>{transaction.description}</span>
              </div>
              <div>
                <span>{transaction.amount}</span>
              </div>
              <div>
                <span>{transaction.date}</span>
              </div>
              <div>
                <button className="cursor-pointer">
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BudgetDetail;
