const BudgetList = ({ budgets }) => {
  return (
    <>
      {budgets.map((budget) => (
        <div
          className="text-center rounded-lg border h-25
        w-70 items-center content-center"
          key={budget.id}
        >
          <div className="flex justify-between content-center m-3">
            <h2>{budget.name}</h2>
            <span>{budget.amount}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default BudgetList;
