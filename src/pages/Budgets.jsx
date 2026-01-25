import { useState, useEffect } from "react";
import BudgetForm from "../components/BudgetForm";
import BudgetList from "../components/BudgetList";

const Budgets = ({ transactionList }) => {
  const [budgets, setBudgets] = useState(
    JSON.parse(localStorage.getItem("budgets")) || [],
  );

  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }, [budgets]);

  const budgetCategories = [
    "Groceries",
    "Transportation",
    "Dining",
    "Bills",
    "Shopping",
    "Healthcare",
    "Other",
  ];

  function addBudget(newBudget) {
    setBudgets([...budgets, newBudget]);
  }

  function handleDelete(budgetId) {
    setBudgets(budgets.filter((budget) => budget.id !== budgetId));
  }

  // const filteredTransactions = transactionList.filter((transaction) =>
  //   budgets.some((budget) => budget.category === transaction.category),
  // );
  // console.log(filteredTransactions);

  return (
    <div className="w-full m-8 p-8">
      <h1 className="">My Budgets</h1>
      <div className="grid grid-cols-3 mt-8 gap-10 ">
        <BudgetForm addBudget={addBudget} budgetCategories={budgetCategories} />
        {budgets.map((budget) => {
          const budgetCalculation = transactionList
            .filter((tran) => {
              return tran.category === budget.category;
            })
            .reduce((sum, transaction) => {
              return sum + parseFloat(transaction.amount);
            }, 0);
          return (
            <BudgetList
              key={budget.id}
              budget={budget}
              budgetCalculation={budgetCalculation}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Budgets;

//map over transactionList and calculate the amount of each transaction of the specific category that was chosen in the budgetForm
//filter transaction list and return transactions that === to budget category
// add all amounts in each transaction from that category and that will be the amount spent

//filter then map whatever is returned and insert List component
