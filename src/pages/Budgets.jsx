import { useState } from "react";
import BudgetForm from "../components/BudgetForm";
import BudgetList from "../components/BudgetList";

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);

  function addBudget(newBudget) {
    setBudgets([...budgets, newBudget]);
  }

  return (
    <div className="w-full m-8 p-8">
      <h1 className="">My Budgets</h1>
      <div className="grid grid-cols-3 mt-8 gap-10 h-30 w-220">
        <BudgetForm addBudget={addBudget} />
        <BudgetList budgets={budgets} />
      </div>
    </div>
  );
};

export default Budgets;
