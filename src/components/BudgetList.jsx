const BudgetList = ({ budget, budgetCalculation }) => {
  console.log(budgetCalculation);
  return (
    <>
      <div className="flex w-80 h-30 text-center rounded-lg border  items-center content-center">
        <div className="flex justify-between content-center m-3">
          <div>
            <h2>{budget.name}</h2>
            <p>{budget.category}</p>
          </div>
          <span>{budget.amount}</span>
          <div>
            <span>${budgetCalculation} spent</span>
            <span>${budget.amount - budgetCalculation} remaining</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BudgetList;

//have total amount spent in that category, now calculate how much of the budget is actually left
