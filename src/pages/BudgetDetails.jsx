import { useParams } from "react-router-dom";

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

  return (
    <>
      <div className="w-full p-8 m-8">
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
            <div className="bg-gray-800 grid grid-cols-4 p-2">
              <div className="">
                <span>{transaction.description}</span>
              </div>
              <div>
                <span>{transaction.amount}</span>
              </div>
              <div>
                <span>{transaction.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BudgetDetail;
